import { z } from "zod";
import {
  UserEntrySchema,
  UserEntryTypeSchema,
  UserEntryUrlSchema,
  UserEntryWhen,
} from "../const";
import "./UserEntryForm.css";
import { CheckboxList } from "./CheckboxList";
import { OptionsSelect } from "./OptionsSelect";

export const UserEntryForm: preact.FunctionComponent<{
  data: z.infer<typeof UserEntrySchema>;
  handleChange: (data: z.infer<typeof UserEntrySchema>) => void;
  handleDelete: () => void;
}> = ({ data, handleChange, handleDelete }) => (
  <article key={data.id} class="entry">
    <label>動作モード</label>
    <OptionsSelect
      data={data.type}
      options={[
        { label: "executeScript", value: "executeScript" },
        { label: "insertCSS", value: "insertCSS" },
      ]}
      handleChange={(newValue) => {
        const hoge = UserEntryTypeSchema.parse(newValue);
        handleChange({ ...data, type: hoge });
      }}
    />
    <label>対象URL</label>
    <input
      type="text"
      placeholder="正規表現パターン"
      value={data.url.source}
      onChange={(e) => {
        if (e.currentTarget.value.trim() === "") {
          handleChange({
            ...data,
            url: /(?:)/,
          });
        }

        handleChange({
          ...data,
          url: UserEntryUrlSchema.parse(e.currentTarget.value),
        });
      }}
    />
    <label>動作タイミング</label>
    <div class="options">
      <CheckboxList
        choises={UserEntryWhen.map((key) => ({
          key,
          label: key,
          value: key,
          handleCheck: () => {
            handleChange({
              ...data,
              when: [...new Set([...data.when, key])],
            });
          },
          handleUncheck: () => {
            handleChange({
              ...data,
              when: data.when.filter((value) => value !== key),
            });
          },
        }))}
        data={data.when}
      />
    </div>
    <label>ソースコード</label>
    <textarea
      value={data.source}
      onChange={(e) => {
        handleChange({ ...data, source: e.currentTarget.value });
      }}
    />
    <div class="controls">
      <button
        onClick={() => {
          handleDelete();
        }}
      >
        このエントリを削除
      </button>
    </div>
  </article>
);
