import React from 'react'
function FormMedication()  {
    return(
        <div className="formMedication">
            Weekly Medication log:
            <table>
                <tr>
                    <td>monday</td>
                    <td><input type='checkbox'></input></td>
                </tr>
                <tr>
                    <td>tuesday</td>
                    <td><input type='checkbox'></input></td>
                </tr>
                <tr>
                    <td>wednesday</td>
                    <td><input type='checkbox'></input></td>
                </tr>
                <tr>
                    <td>thursday</td>
                    <td><input type='checkbox'></input></td>
                </tr>
                <tr>
                    <td>friday</td>
                    <td><input type='checkbox'></input></td>
                </tr>
                <tr>
                    <td>saturday</td>
                    <td><input type='checkbox'></input></td>
                </tr>
                <tr>
                    <td>sunday</td>
                    <td><input type='checkbox'></input></td>
                </tr>
            </table>
        </div>
    )
}

export default FormMedication