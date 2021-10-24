import '../../App.css';

export default function TableHeader () {

    const tableHeadText = ["Month", "Solar Radiation", "AC Energy", "Value"];
    const tableSubheadText = ["", "(kw/ m^2 / day)", "(kWh)", "($)"]; // add these later. 

    const tableHeaders = tableHeadText.map((text, i) => {
        return (<th key={i}> { text }  </th> );
    });

    const tableSubHeaders = tableSubheadText.map((text, i) => {
        return (<th  key={i}> { text } </th>);
    });
    

    return (
        <thead>
            <tr>{ tableHeaders }</tr>
            <tr>{ tableSubHeaders }</tr>
        </thead>
    );
}