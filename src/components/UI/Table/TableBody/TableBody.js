import React from 'react';

const TableBody = ({data}) => {
    return(
       <tr>
            {data.map((item) => {
                return <td key={item}>{item}</td>;
            })}
        </tr>
    )
}

export default TableBody;