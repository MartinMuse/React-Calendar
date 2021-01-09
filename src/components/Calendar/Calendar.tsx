import React from "react"
import styled from 'styled-components'
import {NavLink} from "react-router-dom";
import {IActiveDay} from "../App/App";

interface ICellWrapper {
    isWeekend: boolean,
    isThisMonth?: boolean,
    isToday?: boolean,
    clickedDay?: string,
    isClicked?:boolean,
}

interface ICalendar {
    startDay: any,
    today?: any,
    activeDay?: string|undefined,
    setActiveDay?: any
}

interface IDayWrapper {
    isToday?: boolean
}

const SUNDAY = 0;
const SATURDAY = 6;
const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CellWrapper = styled.div<ICellWrapper>`
  width:100%;
  padding:2px;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  background-color:${(props) => (props.isWeekend ? '#1E1F21' : '#27282A')};
  border:${(props => (props.isToday || props.isClicked? 'solid' : 'none'))};
  border-width:3px;
  border-color:${(props => (props.isClicked ? 'white' : 'red'))};
  color: ${(props) => (props.isThisMonth ? 'white' : 'grey')};
  font-family: -apple-system;
  `

const WeekdayNameCell=styled.div`
     color: white;
     display:flex;
     justify-content:flex-end;
     background-color:#1E1F21;
     padding-right:8px;
`

const DayWrapper = styled.div<IDayWrapper>`
    margin:2px;
	height: 31px;
	width: 31px;
    display: flex;
    align-items: center;
    justify-content: center;`


const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1.5em repeat(6, 1fr);
  grid-gap: 1px;
  background-color: #68666A;
  height:89%
`

const Calendar: React.FC<ICalendar> = ({startDay, today, activeDay, setActiveDay}) => {
    const totalDays = 42;
    const day = startDay.clone().subtract(1, 'day');
    const daysMap = [...Array(totalDays)].map(() => day.add(1, 'day').clone())
    return (
        <GridWrapper>
            {
                weekdayNames.map(d=>(<WeekdayNameCell>{d}</WeekdayNameCell>))
            }
            {
                daysMap.map((dayItem) => (
                    <NavLink to={'todo'}>
                        <CellWrapper
                            isWeekend={dayItem.day() === SATURDAY || dayItem.day() === SUNDAY}
                            isThisMonth={dayItem.format('MM-YYYY') === today.format('MM-YYYY')}
                            isToday={dayItem.format('MM-DD-YYYY') === today.format('MM-DD-YYYY')}
                            onClick={()=>setActiveDay({
                                fullDate: dayItem.format('MM-DD-YYYY'),
                                number: dayItem.format('D'),
                                activeDayMonth: dayItem.format('MMMM')
                            })}
                            isClicked={activeDay===dayItem.format('MM-DD-YYYY')}
                            key={dayItem.format('MM-DD-YYYY')}
                        >
                            <DayWrapper>
                                {dayItem.format('D')}
                            </DayWrapper>
                        </CellWrapper>
                    </NavLink>

                ))
            }
        </GridWrapper>
    );

}


export default Calendar