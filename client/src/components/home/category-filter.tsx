import * as React from 'react';


export class Filter extends React.Component<any,{}> {

    public constructor(props: any) {
        super(props);
    }
    public render() {

        return (
            <div>
                <table className= "table table-dark col" id="reimb-table">
    
                    <tbody>
                    {
                        this.props.map((item: any) => (
                        <tr key ={item.id}>
                            <td>{item.id}</td>
                            <td> {item.categoryName} </td>
                        </tr>
                        ))
                    } 
                    </tbody>
                </table>
            </div>
        );
    }
}