import React, { Component } from 'react';
import { Placeholder, Grid, Segment } from 'semantic-ui-react'


class SmallPlaceHolder extends Component{
    render(){
        return(
            <React.Fragment>
  <Grid style={{marginBottom: '30px'}} columns={3} stackable>
    <Grid.Column>
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length='medium' />
            <Placeholder.Line length='short' />
          </Placeholder.Paragraph>
        </Placeholder>
    </Grid.Column>

    <Grid.Column>
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length='medium' />
            <Placeholder.Line length='short' />
          </Placeholder.Paragraph>
        </Placeholder>
    </Grid.Column>

    <Grid.Column>
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length='medium' />
            <Placeholder.Line length='short' />
          </Placeholder.Paragraph>
        </Placeholder>
    </Grid.Column>
  </Grid>
          </React.Fragment>
        )
    }
}

export default SmallPlaceHolder;