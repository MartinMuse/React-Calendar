import React from "react"
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const MonitorWrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    background-color:#1E1F21;
    color: white;
    padding:16px;
    @media (max-width: 475px){
        flex-direction:column;
    }
`
const TextWrapper = styled.span`
    font-size:3rem;
    margin-right:8px;
`
const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 475px){
       width:50%;
       justify-content:space-between;
    }
`

const ButtonWrapper = styled.button`
    border: unset;
    background-color:#565759;
    height:20px;
    margin:2px;
    border-radius: 4px;
    color:#E6E6E6;
    @media (max-width: 475px){
       height:30px;
       margin: 5px;
    }
`
const TodayButton = styled(ButtonWrapper)`
padding-right:16px;
padding-left:16px;
font-weight: bold;
`

interface IMonitor {
    month: string,
    year: string,
    onForwardMonth?: any,
    onBackMonth?: any,
    day?: string,
    isCalendar?: boolean,
    activeDayMonth?: string,
    onTodayButton?: any,
}


const Monitor: React.FC<IMonitor> = ({month, year, onForwardMonth, onBackMonth, isCalendar, day, activeDayMonth, onTodayButton}) => {
    return (
        <MonitorWrapper>
            {isCalendar ?
                <div>
                    <TextWrapper><b>{month}</b></TextWrapper>
                    <TextWrapper>{year}</TextWrapper>
                </div> : <div>
                    <TextWrapper><b>{day}</b></TextWrapper>
                    <TextWrapper>{activeDayMonth}</TextWrapper>
                </div>}

            {isCalendar ?
                <ButtonsWrapper>
                    <ButtonWrapper onClick={onBackMonth}>{'<'}</ButtonWrapper>
                    <TodayButton onClick={onTodayButton}>Today</TodayButton>
                    <ButtonWrapper onClick={onForwardMonth}>{'>'}</ButtonWrapper>
                </ButtonsWrapper> : <NavLink to={'/home'}><TodayButton>Back</TodayButton></NavLink>}
        </MonitorWrapper>)
}

export default Monitor