import React, { useState } from 'react';
import { Button, Card, Grid, List } from "antd";
import './searchhistory.css'

interface MyComponentProps {
  searchHistory: any;
  setSearchHistory: (name: object) => void;
}

type PaginationPosition = 'top' | 'bottom' | 'both';

type PaginationAlign = 'start' | 'center' | 'end';


function removeObjectWithId(arr:any, id:any) {
  arr.splice(id, 1);
  return arr;
}


function deleteHistory(searchHistory: any, index: any, onDeleteHistory:any) {
  let newArr = removeObjectWithId(searchHistory, index);
  console.log(newArr)
  onDeleteHistory(newArr)
}

const SearchHistory = (props: MyComponentProps): JSX.Element => {

  const [position, setPosition] = useState<PaginationPosition>('bottom');
  const [align, setAlign] = useState<PaginationAlign>('center');
  
  const { searchHistory, setSearchHistory } = props;

  const onDeleteHistory = (oldDataSource: any) => {
    const newDataSource = [...oldDataSource]
    setSearchHistory(newDataSource);
  };

  console.log(searchHistory, "DID IT REL:OAD")
  return (
    <div>

      <Card style={{ textAlign: 'center', marginTop: '7%', marginBottom: '7%' }}>
        <h4>Search History</h4>
        <List
          itemLayout="horizontal"
          pagination={{ position, align }}
          dataSource={searchHistory}
          renderItem={(item: any, index: any) => (
            <List.Item actions={[<Button size="small">search again</Button>, <Button onClick={() => { deleteHistory(searchHistory, index, onDeleteHistory) }} size="small">Delete</Button>]}>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
              />
            </List.Item>
          )}
        />
      </Card></div>


  );
};

export default SearchHistory
