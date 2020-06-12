import React, { Component } from 'react';
import { Placeholder } from 'semantic-ui-react'


class LargePlaceHolder extends Component{
    render(){
        return(
            <Placeholder style={{marginBottom: '30px'}} fluid>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        )
    }
}

export default LargePlaceHolder;