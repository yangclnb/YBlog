import base64 from "base-64";
import utf8 from "utf8";

const FillText = "YBlogArticle";

/**
 * @function: encode
 * @description: 编码文章id
 * @param {*} number
 * @return {*} 输入非数字直接返回null | BananaArticle(编码结果)
 * @author: Banana
 */
export const encode = (number) => {
  if (isNaN(number)) return null;
  number = "" + number;
  let bytes = utf8.encode(number);
  let encoded = base64.encode(bytes);
  return FillText + encoded;
};

/**
 * @function: decode
 * @description: 解码id
 * @param {*} code
 * @return {*}
 * @author: Banana
 */
export const decode = (code) => {
  let bytes = base64.decode(code.slice(FillText.length));
  let text = utf8.decode(bytes);
  return text;
};
