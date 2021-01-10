import React from "react"
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import IntervalItem from "./IntervalItem";
import {connect} from "react-redux";
import {ActionTypes, IDayItem, setTitleAC} from "../../redux/notesReducer";
import {AppStateType} from "../../redux/store";

const IntervalWrapper = styled.div`
    margin:auto;
    color:white;
    font-size: 20px;
    height:85%;
    width:70%;
    display:flex;
    flex-direction:column;
`
type MapStatePropsType = {
    days: Array<IDayItem> | undefined
}

type MapDispatchPropsType = {
    setTitleAC: (dayId: string, inputId: string, title: string) => void
}

type OwnPropsType = {
    dayId: string
}

type PropsType = MapDispatchPropsType & MapStatePropsType & OwnPropsType


const NotesPage: React.FC<PropsType> = ({...props}) => {
    const onChange = (inputId: string, title: string) => {
        props.setTitleAC(props.dayId, inputId, title)
    }
    const takeTitle = (dayId: string, inputId: string) => {
        const day = props.days?.find((d) => (d.dayId === dayId))
        let input = day?.inputs.find((i) => i.inputId === inputId)
        return input?.title
    }
    const timeIntervals = [
        '8:00', '9:00',
        '10:00', '11:00',
        '12:00', '13:00',
        '14:00', '15:00',
        '16:00', '17:00',
        '18:00', '19:00',
        '20:00']
    return (
        <IntervalWrapper>
            {timeIntervals.map(t => (
                <IntervalItem onChange={onChange} inputId={t} title={takeTitle(props.dayId, t)}/>
            ))}
        </IntervalWrapper>
    );
}

const mapStateToProps = (state: AppStateType) => ({
    days: state.notes?.days
})

const ConnectedNotesPage = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps, {setTitleAC})(NotesPage)
export default ConnectedNotesPage