function clickMe(){
    return alert("Hello..");
}

function RenderTable(brandNames){
    return brandNames.map((brandName)=>{
        const {id,brand} = brandName;
        return (
            <tr>
                <td>{id}</td>
                <td>{brand}</td>
                <td><button onClick={()=>clickMe()}>OK</button></td>
            </tr>
        );        
    });
}

function DataTable(){
    const brandNames = [
        {id:1,brand:"Toyota"},
        {id:2,brand:"Mazda"},
        {id:3,brand:"Kubota"},
    ];
    return (
        <table>
                <tbody>{RenderTable(brandNames)}</tbody>
        </table>
    );
}

export default DataTable;