const SET_TITLE = 'SET_TITLE'

export interface IDayItem {
    dayId: string
    inputs: IInputItem[]
}

interface IInputItem {
    inputId: string
    title: string
}

export interface IState {
    days: IDayItem[]
}

const initialState: IState = {
    days: []
}


function updateObjectInArray(array:Array<IDayItem>, updateEl:IDayItem):Array<IDayItem> {
    return array.map((item) => {
        if (item.dayId!==updateEl.dayId) {
            return item
        }
        return {
            ...item,
            ...updateEl
        }
    })
}

export type ActionTypes = ReturnType<typeof setTitleAC>

function notesReducer(state = initialState, action: ActionTypes): IState | undefined {
    switch (action.type) {
        case SET_TITLE:
            let updateItem = state.days.find((d) => (d.dayId === action.dayId));
            if (!updateItem) {
                return {
                    days: [...state.days, {
                        dayId: action.dayId,
                        inputs: [{
                            inputId: action.inputId,
                            title: action.title
                        }]
                    }]
                }
            } else {
                let updateItemInput = updateItem.inputs.find((i) => (i.inputId === action.inputId))
                !updateItemInput ? updateItem.inputs.push({
                    inputId: action.inputId,
                    title: action.title
                }) : updateItemInput.title = action.title
                return {
                    days: updateObjectInArray(state.days,updateItem)
                }
            }
        default:
            return state

    }


}

export const setTitleAC = (dayId: string, inputId: string, title: string) => {
    return {type: SET_TITLE, dayId, inputId, title,}
}

export default notesReducer;
