"use strict";
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎりループで削除し続ける
    element.removeChild(element.firstChild);
  }
}
/**
 * 指定した要素に診断結果用のタグを設定する
 * @param {HTMLElement} element HTMLの要素
 */
function appendAssessmentResult(element, result) {
  // result-area に h3 タグで'診断結果'という文字を表示
  const h3 = document.createElement("h3"); // h3タグを作る
  h3.innerText = "診断結果"; //h3タグに'診断結果'の文字列を設定
  element.appendChild(h3); // result-area に h3 変数を設定

  //result-area に p タグで診断結果を表示
  const p = document.createElement("p");
  p.innerText = result;
  element.appendChild(p);
}

assessmentButton.onclick = () => {
  let userName = userNameInput.value;
  if (!userName) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果の表示
  removeAllChildren(resultDivided); //診断結果エリアの初期化

  //診断を実行して表示
  const result = assessment(userName);
  appendAssessmentResult(resultDivided, result);

  // Tweetボタンの表示
  removeAllChildren(tweetDivided); //tweetエリアの初期化

  // aタグをつくって属性を設定する
  const a = document.createElement("a");
  const href =
    "https://twitter.com/intent/tweet?button_hashtag=" +
    encodeURIComponent("あなたのいいところ") +
    "&ref_src=twsrc%5Etfw";
  a.setAttribute("href", href); //ｱﾄﾘﾋﾞｭｰﾄはタグの中の一塊のこと。JSでつくるHTMLのクラスみたいな　// setAttributeは引数が2つある　//1つは上のconstの属性をあらわすhref、 ” で囲う。　//カンマで区切ってから、2つ目はその隣の値部分 href　//これによりHTMLのaタグにURLが追加される
  a.className = "twitter-hashtag-button";
  a.setAttribute("data-text", result);
  a.innerText = "Tweet #あなたのいいところ";

  // aタグをHTMLとして追加する
  tweetDivided.appendChild(a);

  //scriptタグをつくる
  const script = document.createElement("script");
  script.setAttribute("src", "https://platform.twitter.com/widgets.js");

  // scriptタグをHTMLとして追加する
  tweetDivided.appendChild(script);
};

const answers = [
  "{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。",
  "{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。",
  "{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。",
  "{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。",
  "{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。",
  "{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。",
  "{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。",
  "{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。",
  "{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。",
  "{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。",
  "{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。",
  "{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。",
  "{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。",
  "{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。",
  "{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。",
  "{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。",
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replace(/\{userName\}/g, userName);
  return result;
}

テストコード;
console.assert(
  assessment("太郎") ===
    "太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。",
  "診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。"
);
console.assert(
  assessment("太郎") === assessment("太郎"),
  "入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。"
);
