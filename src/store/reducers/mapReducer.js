const initState = {
   report:[
       {id:1, lat: 27.508042999999997, lng:90.51571369999999},
       {id:2, lat: 28.5, lng:89.50},
       {id:3, lat: 28.3, lng:90.3},
   ]
}

const mapReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATED_REPORT_INFO': 
        console.log("Info reported", action.reportInfo);
        break;

        default:
            return null;
    }
    return state;
}


export default mapReducer;