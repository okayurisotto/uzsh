import { useEffect, useState } from "preact/hooks";
import { StorageKey, StorageSchema, UserEntrySchema } from "../const";
import { z } from "zod";
import { UserEntryForm } from "./UserEntryForm";
import { Empty } from "../type";
import "./App.css";
import { storage } from "webextension-polyfill";

export const App: preact.FunctionComponent<Empty> = () => {
  const [entries, setEntries] = useState<z.infer<typeof UserEntrySchema>[]>([]);

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
  };

  const handleSave = async () => {
    await storage.local.set({
      [StorageKey.UserEntries]: entries.map((entry) => ({
        ...entry,
        url: entry.url.source,
      })),
    });
  };

  return (
    <>
      <div class="global-controls">
        <button onClick={handleAdd}>エントリを新規作成</button>
        <button onClick={() => void handleSave()}>設定を保存</button>
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
          }}
          handleDelete={() => {
            setEntries(entries.filter((entry) => entry.id !== value.id));
          }}
        />
      ))}
    </>
  );
};
