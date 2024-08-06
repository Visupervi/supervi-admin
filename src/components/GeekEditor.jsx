import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor, { Jodit } from 'jodit-react';
import { Form } from 'antd';
export default ({ placeholder, text }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(text);
  const form = Form.useFormInstance();
  const config = useMemo(
    () => ({
      language: "zh_cn",
      statusbar: false,
      showTooltip: true,
      addNewLine: false,
      i18n: {
        'zh_cn': {

        }
      },
      //将语言版本设置为中文后仍然还有部分显示的英)zh_cn:{//简体中文
      // top:“上”,
      // right:“右”
      // bottom:“下”,
      // left:“左”
      // Title:“标题”
      // Link:"链接”
      // "Line height":"行高”
      // Alternative:"描述”,
      // "Alternative text":"描述”
      // "Lower Alpha":“小写英文字母”
      // "Lower Greek":“小写希腊字母”
      // "Lower Roman":“小写罗马数字”
      // "Upper Alpha":“大写英文字母”
      // "Upper Roman":"大写罗马数字”
      // }，
      // zh_tw:{//中文繁体
      // Link:'鏈接
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || 'Start typings...'
    }),
    [placeholder, text]
  );
  const setContentHandle = (newContent) => {
    setContent(newContent)
    form.setFieldsValue({ content: newContent })
  }
  useEffect(() => {
    // jodit坑，不能动态回显，只能调用方法去赋值
    const jodit = new Jodit(editor.current)
    jodit.setEditorValue(text)
  }, [text])
  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={setContentHandle} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => { }}
    />
  );
}