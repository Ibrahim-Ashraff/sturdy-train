import React from 'react';
import TableHead from './TableHead/TableHead';
import TableBody from './TableBody/TableBody';

const table = (props) => {
    return (
        <table className={props.className} >
            <thead>
                <tr>
                    {props.headData.map((item) => {
                        return <TableHead key={item} item={item} />
                    })}
                </tr>
            </thead>
            <tbody>
                {props.bodyData.map((item) => {
                    return <TableBody key={item.id} data={item.items} />
                })}
            </tbody>
        </table>
    )
}
export default table;