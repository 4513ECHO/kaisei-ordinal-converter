import { createRoute } from "honox/factory";
import Form from "../islands/form.tsx";

export default createRoute((c) => {
  return c.render(
    <div className="p-6 mx-auto max-w-3xl">
      <h1 className="py-2 text-2xl font-bold">開成大運動会 序数変換ツール</h1>
      <Form />
      <h2 className="py-2 text-xl font-bold">これは何</h2>
      <p>
        開成大運動会の開催年度・開催回数・各組が何代目かを相互に変換するツールです。
      </p>
      <h2 className="py-2 text-xl font-bold">注意</h2>
      <p>
        実装の簡略化のため、過去のデータを反映しきれていないことがあります（第53・54代紫組の欠番など）。
        <br />
        より正確なものについては運動会史究明局活動報告書第8版をご覧ください。
      </p>
      <h2 className="py-2 text-xl font-bold">お問い合わせ</h2>
      <p>
        バグ報告・機能追加・要望などは<a
          href="//github.com/4513ECHO/kaisei-ordinal-converter"
          className="hover:underline text-sky-700"
        >
          GitHubリポジトリ
        </a>か響（<a
          className="hover:underline text-sky-700"
          href="//x.com/4513echo"
        >
          Twitter
        </a>）までお願いします。
      </p>
    </div>,
  );
});
