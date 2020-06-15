import React, { Component } from 'react';
import { Pagination } from 'semantic-ui-react'
class PaginationCard extends Component{
    constructor(props){
        super(props)
        this.state={
            url: this.props.url,
        }
    }

    async changePage(id){
        let regex = /page=\d+/
        let url = this.state.url.replace(regex, `page=${id}`)
        await fetch(url, {
         headers: {
           "Content-type": "application/json; charset=UTF-8",
           'Authorization': `Token ${sessionStorage.getItem('token')}`,  
          },
       })
         .then((res) => res.json())
         .then((results) => {
           results = results.results
           this.props.sendData(results)
         });
        this.props.currentUrl(url)
    }

    render(){
        const {count} = this.props
        let totalPages = 0
        if(count%10===0){
          totalPages = count/10
        }else{
          totalPages = Math.trunc(count/10) + 1 
        }
        if(count == 0){
          return null
        }
        return(
            <Pagination
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={totalPages}
            onPageChange={(event, data) =>this.changePage(data.activePage)}
          />
        )
    }
} 

export default PaginationCard;