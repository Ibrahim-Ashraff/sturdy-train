import React from 'react';
import { ReactSVG } from 'react-svg'
import empty from '../../../../assets/images/empty.svg';


const EmptyTable = props => {
    return (
        <div>
            <div className="emptyheader"></div>
            <div className="emptycontent" >
                <ReactSVG src={empty} />
                <span> You haven't added any {props.title} yet</span>
            </div>
        </div>
    )
}

export default EmptyTable;