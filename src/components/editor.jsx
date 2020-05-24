import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
    Container,
    Header,
    Divider,
    Button,
    Segment,
    Card,
    Icon,
    Form,
    Modal,
  } from "semantic-ui-react";
import './styles/editor.scss';

class App extends React.Component {

  constructor(props){
      super(props)
      this.state={
          nightmode: false,
      }
  }

  handleEditorChange = (content, editor) => {   
    this.props.onEditorChange(content)
  }

  render() {
    const { placeholder, initialValue } = this.props
    return (
      <Editor
        className= 'editor'
        apiKey="mie9vhe6ax9huqv2dxqfn7ylworri9fmlpn195thosq7vv2q"
        initialValue = {initialValue}
        init={{
          placeholder:placeholder,
          height: 300,
          menubar: false,
          plugins: [
            'advlist lists link image charmap print preview anchor codesample autolink quickbars hr',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media paste code wordcount'
          ],
          toolbar: 'bold italic | link blockquote code quickimage  codesample | bullist numlist hr | undo redo ',
          statusbar: false,
          skin: ( this.state.nightmode ? "oxide-dark" : ""),
          content_css: ( this.state.nightmode ? "dark" : ""),
          quickbars_selection_toolbar: 'bold italic |  backcolor  | formatselect | quicklink blockquote',
          quickbars_insert_toolbar: 'quickimage hr formatselect ',
          toolbar_mode: 'floating',
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}

export default App;