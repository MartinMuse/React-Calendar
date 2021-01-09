import React, {EventHandler, FormEvent, MouseEvent} from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";


interface IIntervalItem{
    inputId: string,
    title: string|undefined,
    onChange: (inputId:string,title:string)=>void
}

const ItemWrapper=styled.div`
    display:flex;
    width:100%;
    padding: 8px;
    justify-content:center;
`

const TineItem=styled.div`
    width: 15%;
`

const ItemInput=styled.input`
    color:white;
    border-color: #68666A;
    padding-left:16px;
    margin-right: 16px;
    font-size:20px;
    width:85%;
    border-style:none;
    border-bottom-style:solid;
    border-bottom-width: 1px;
    background-color:transparent;
    outline:none;
`

const IntervalItem: React.FC<IIntervalItem> = ({...props}) => {
    const onChange=(e: React.FormEvent<HTMLInputElement>)=>{
        props.onChange(props.inputId,e.currentTarget.value)
    }
    return (
        <ItemWrapper>
                <TineItem>
                    {props.inputId}
                </TineItem>
            <ItemInput type={'text'} value={props.title} onChange={onChange}/>
        </ItemWrapper>
    )
}


export default IntervalItem;