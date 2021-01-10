import React, {useState} from 'react';
import Monitor from "../Monitor/Monitor";
import Calendar from "../Calendar/Calendar";
import moment from "moment"
import styled from "styled-components";
import Title from "../Title/Title";
import {Route, Redirect} from "react-router-dom"
import ConnectedNotesPage from "../TodoList/NotesPage";

const Wrapper = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:95%;
`
const ContentWrapper = styled.div`
    height:100%;
`

interface IActiveMonth {
    number: string,
    name: string
}

export interface IActiveDay {
    fullDate: string,
    number: string,
    activeDayMonth: string
}

const getDate = function (year: string, month: string, day: string,): string {
    return year + '-' + month + '-' + day;
}

function App() {
    moment.updateLocale('en', {week: {dow: 1}})
    const today = moment()
    const [activeDay, setActiveDay] = useState<IActiveDay>({
        fullDate: today.format('MM-DD-YYYY'),
        number: today.format('D'),
        activeDayMonth: today.format('MMMM')
    });
    const [activeMonth, setActiveMonth] = useState<IActiveMonth>({
        number: today.format('MM'),
        name: today.format('MMMM')
    });
    const [activeYear, setActiveYear] = useState<string>(today.format('YYYY'))
    const startDay = moment(getDate(activeYear, activeMonth.number, '01')).startOf('month').startOf('week')

    const onTodayButton = () => {
        setActiveMonth({
            number: today.format('MM'),
            name: today.format('MMMM')
        })
        setActiveDay({
            fullDate: today.format('MM-DD-YYYY'),
            number: today.format('D'),
            activeDayMonth: today.format('MMMM')
        })
        setActiveYear(today.format('YYYY'))
        return
    }

    const onForwardMonth = () => {
        let date = moment(getDate(activeYear, activeMonth.number, '01'))
        date = date.add(1, 'month');
        setActiveMonth({number: date.format('MM'), name: date.format('MMMM')})
        if (activeMonth.name === 'December') {
            setActiveYear(moment(getDate(activeYear, activeMonth.number, '01')).add(1, 'year').format('YYYY'))
        }
        return
    }
    const onBackMonth = () => {
        let date = moment(getDate(activeYear, activeMonth.number, '01'))
        date = date.subtract(1, 'month');
        setActiveMonth({number: date.format('MM'), name: date.format('MMMM')})
        if (activeMonth.name === 'January') {
            setActiveYear(moment(getDate(activeYear, activeMonth.number, '01')).subtract(1, 'year').format('YYYY'))
        }
        return
    }
    return (
        <Wrapper>
            <Title/>
            <Route exact path={'/'}>
                <Redirect to="/home"/>
            </Route>
            <Route exact path={'/home'} render={() => (<ContentWrapper>
                <Monitor month={activeMonth.name} year={activeYear}
                         onForwardMonth={onForwardMonth}
                         onBackMonth={onBackMonth}
                         isCalendar={true}
                         onTodayButton={onTodayButton}/>
                <Calendar startDay={(startDay)} today={today} activeDay={activeDay.fullDate}
                          setActiveDay={(day: IActiveDay) => (setActiveDay(day))}/>
            </ContentWrapper>)}/>
            <Route path={'/todo'} render={() => (
                <ContentWrapper>
                    <Monitor month={activeMonth.name} year={activeYear}
                             onForwardMonth={onForwardMonth}
                             onBackMonth={onBackMonth}
                             isCalendar={false}
                             day={activeDay.number}
                             activeDayMonth={activeDay.activeDayMonth}/>
                    <ConnectedNotesPage dayId={activeDay.fullDate}/>
                </ContentWrapper>)}/>
        </Wrapper>
    )
}


export default App;
