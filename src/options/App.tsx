import { createRef } from "preact";
import { useEffect, useState } from "preact/hooks";
import { storage } from "webextension-polyfill";
import { z } from "zod";
import { StorageKey, StorageSchema, UserEntrySchema } from "../const";
import type { Empty } from "../type";
import "./App.css";
import { UserEntryForm } from "./UserEntryForm";

export const App: preact.FunctionComponent<Empty> = () => {
  const [entries, setEntries] = useState<z.infer<typeof UserEntrySchema>[]>([]);
  const [unsaved, setUnsaved] = useState<boolean>(false);

  useEffect(() => {
    void (async () => {
      const data = await storage.local.get(StorageKey.UserEntries);
      setEntries(StorageSchema.parse(data)[StorageKey.UserEntries]);
    })();
  }, []);

  const handleAdd = () => {
    setEntries([
      ...entries,
      {
        id: crypto.randomUUID(),
        type: "executeScript",
        url: /(?:)/,
        when: [],
        source: "",
      },
    ]);

    setUnsaved(true);
  };

  const handleSave = async () => {
    await storage.local.set({
      [StorageKey.UserEntries]: entries.map((entry) => ({
        ...entry,
        url: entry.url.source,
      })),
    });

    setUnsaved(false);
  };

  const handleExport = () => {
    const data = {
      version: 1,
      entries: entries.map((entry) => ({ ...entry, url: entry.url.source })),
    };
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const now = new Date();
    const filename =
      [
        "uzsh",
        [
          now.getFullYear().toString().padStart(4, "0"),
          (now.getMonth() + 1).toString().padStart(2, "0"),
          now.getDate().toString().padStart(2, "0"),
        ].join("-"),
        [
          now.getHours().toString().padStart(2, "0"),
          now.getMinutes().toString().padStart(2, "0"),
          now.getSeconds().toString().padStart(2, "0"),
        ].join("-"),
      ].join("_") + ".json";

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleImport = async (file: File) => {
    const json = await file.text();

    const data = z
      .object({
        version: z.literal(1),
        entries: UserEntrySchema.extend({ url: z.string() }).array(),
      })
      .parse(JSON.parse(json));

    setEntries(
      [
        ...data.entries.map((entry) => ({
          ...entry,
          url: new RegExp(entry.url),
        })),
        ...entries,
      ].filter((entry, index, source) => {
        return source.findIndex((current) => current.id === entry.id) === index;
      }),
    );

    await handleSave();
  };

  const importFileInputRef = createRef<HTMLInputElement>();
  return (
    <>
      <div class="global-controls">
        <button onClick={handleAdd}>エントリを新規作成</button>
        <button disabled={!unsaved} onClick={() => void handleSave()}>
          設定を保存
        </button>
        <button onClick={handleExport}>設定をエクスポート</button>
        <button
          onClick={() => {
            importFileInputRef.current?.click();
          }}
        >
          設定をインポート
        </button>
        <input
          ref={importFileInputRef}
          type="file"
          multiple={false}
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.currentTarget.files === null) return;

            const [file] = e.currentTarget.files;
            if (file === undefined) return;

            return void (async () => {
              await handleImport(file);
            })();
          }}
        />
      </div>
      {entries.map((value) => (
        <UserEntryForm
          data={value}
          handleChange={(newValue) => {
            setEntries(
              entries.map((entry) => {
                if (entry.id !== value.id) return entry;
                return newValue;
              }),
            );
            setUnsaved(true);
          }}
          handleDelete={() => {
            setEntries(entries.filter((entry) => entry.id !== value.id));
            setUnsaved(true);
          }}
        />
      ))}
    </>
  );
};
