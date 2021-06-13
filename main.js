"use strict";
// All global variables 
const metric_select = document.getElementById('metric_select'), input = document.querySelector('.input'), add_row_btn = document.getElementById('add_row'), delete_btn = document.getElementById('delete_0');
let count = 1;
// object for storing all data
const mainObject = {
    // length
    ald: { mm: 1700, cm: 170, m: 1.7, km: 0.0017 },
    alen: { mm: 600, cm: 60, m: 0.6, km: 0.0006 },
    arabic_mile: { mm: 1900000, cm: 190000, m: 1900, km: 1.9 },
    bamboo: { mm: 12800, cm: 1280, m: 12.8, km: 0.0128 },
    barleycorn: { mm: 8.47, cm: 0.847, m: 0.00847, km: 0.00000847 },
    cana: { mm: 1570, cm: 157, m: 1.57, km: 0.00157 },
    girah: { mm: 57.15, cm: 5.715, m: 0.05715, km: 0.00005715 },
    macedonian_cubit: { mm: 355.6, cm: 35.56, m: 0.3556, km: 0.0003556 },
    pes: { mm: 296, cm: 29.6, m: 0.296, km: 0.000296 },
    unglie: { mm: 19.05, cm: 1.905, m: 0.01905, km: 0.00001905 },
    // Weigh
    abucco: { gr: 196.44, kg: 0.19644, t: 0.00019644 },
    bag: { gr: 43000, kg: 43, t: 0.043 },
    candy: { gr: 227000, kg: 227, t: 0.227 },
    dharni: { gr: 2332.5, kg: 2.3325, t: 0.0023325 },
    dutch_cask: { gr: 51000, kg: 51, t: 0.051 },
    faggot: { gr: 54000, kg: 54, t: 0.054 },
    lot: { gr: 30, kg: 0.030, t: 0.000030 },
    oka: { gr: 1282.9, kg: 1.2829, t: 0.0012829 },
    tank: { gr: 69, kg: 0.069, t: 0.000069 },
    whey: { gr: 107000, kg: 107, t: 0.107 },
    // Volume
    adowlie: { ml: 2509000, l: 2509, cub_mtr: 2.509 },
    amphora: { ml: 34000, l: 34, cub_mtr: 0.034 },
    chungah: { ml: 758, l: 0.758, cub_mtr: 0.000758 },
    congius: { ml: 3480, l: 3.480, cub_mtr: 0.003480 },
    cran: { ml: 170500, l: 170.5, cub_mtr: 0.1705 },
    hekat: { ml: 4800, l: 4.8, cub_mtr: 0.0048 },
    koku: { ml: 180000, l: 180, cub_mtr: 0.180 },
    peck: { ml: 9000, l: 9, cub_mtr: 0.009 },
    puddee: { ml: 1640, l: 1.64, cub_mtr: 0.00164 },
    shipping_ton: { ml: 1400000, l: 1400, cub_mtr: 1.4 }
};
// object for storing all data
// listen for user input, select and convert
input.addEventListener('input', convert);
// event listener for the first delete button
delete_btn.addEventListener('click', () => {
    delete_btn.parentElement.parentElement.remove();
});
// function to convert 
function convert() {
    const pointer = this.dataset.point;
    const to_be_converted = document.querySelector(`.to_be_converted_${pointer}`).value;
    const convert_to = document.querySelector(`.convert_to_${pointer}`).value;
    const result = document.getElementById(`result_${pointer}`);
    const select_to_be_converted = document.querySelector(`.to_be_converted_${pointer}`);
    const select_convert_to = document.querySelector(`.convert_to_${pointer}`);
    const copy_btn = document.getElementById(`copy_${pointer}`);
    // Listen for changes of select element
    const correct_this = this;
    [select_to_be_converted, select_convert_to]
        .forEach(element => {
        element.addEventListener('change', convert.bind(correct_this));
    });
    // if the input is 0, too big or negative then return
    if (+this.value <= 0) {
        result.value = '';
        return;
    }
    else if (!Number.isSafeInteger(+this.value)) {
        // get coordinates to bring an alert
        const html = document.documentElement, scroll_top = html.scrollTop, client_height = html.clientHeight, needed_coordinate = scroll_top + client_height - 80, 
        // assign coordinates to the alert
        alert = document.querySelector('.animationForAlert');
        alert.style.top = needed_coordinate + 'px';
        alert.classList.add('move');
        // remove class in a few seconds
        setTimeout(() => {
            alert.classList.remove('move');
        }, 5000);
        result.value = '';
        return;
    }
    // everything is good
    let final_value;
    final_value = mainObject[to_be_converted][convert_to] * +this.value;
    // show the result
    result.value = final_value.toString();
    // copy value
    copy_btn.addEventListener('click', () => {
        setTimeout(() => {
            const textarea = document.createElement('textarea');
            textarea.value = result.value;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }, 500);
    });
}
// Create a new row
add_row_btn.addEventListener('click', () => {
    // get the value of a needed metric 
    const required_value = metric_select.value;
    if (required_value == 'weight') {
        // create html and add to the table
        const newHTML = `
         <!-- The value to be converted -->
         <td scope="row">
             <select class="form-select to_be_converted to_be_converted_${count}" data-point="${count}">
             <option value="abucco">abucco</option>
        <option value="bag">bag</option>
        <option value="candy">candy</option>
        <option value="dharni">dharni</option>
        <option value="dutch_cask">dutch cask</option>
        <option value="faggot">faggot</option>
        <option value="lot">lot</option>
        <option value="oka">oka</option>
        <option value="tank">tank</option>
        <option value="whey">whey</option> 
             </select>
             </td>
             <!-- User input -->
             <td><input type="number" class="form-control input input_${count}" data-point="${count}"></td>
             <!-- Convert to -->
             <td>
             <select class="form-select convert_to convert_to_${count}" data-point="${count}">
             <option value="gr" selected>grams</option>
        <option value="kg">kilograms</option>
        <option value="t">tonne</option>
             </select>
         </td>
         <td style="display: flex;">
             <!-- Result input -->
             <input type="number" class="form-control" id="result_${count}" disabled>
             <!-- Copy button -->
             <a tabindex="0" class="btn btn-secondary" id="copy_${count}" role="button" style="border: none;"
                        data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top"
                        data-bs-content="Copied" data-bs-trigger="focus">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-clipboard" viewBox="0 0 16 16">
                            <path
                                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                            <path
                                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                        </svg>
                    </a>
         </td>
         <td>
             <!-- Delete button -->
             <button type="button" title="Delete row" class="btn btn-danger" id="delete_${count}">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-trash-fill" viewBox="0 0 16 16">
                     <path
                         d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                 </svg>
             </button>
         </td>
     `;
        let tr = document.createElement('tr');
        tr.innerHTML = newHTML;
        document.querySelector('tbody').appendChild(tr);
        // add listener for input 
        let new_input = document.querySelector(`.input_${count}`);
        new_input.addEventListener('input', convert);
        // delete row
        const current_delete = document.querySelector(`#delete_${count}`);
        current_delete.addEventListener('click', () => {
            current_delete.parentElement.parentElement.remove();
        });
        // dynamically change select 
        const current_convert_to = document.querySelector(`.to_be_converted_${count}`);
        current_convert_to.children[count % 10].selected = 'selected';
        // increase count
        count++;
    }
    else if (required_value == 'volume') {
        // create html and add to the table
        const newHTML = `
            <!-- The value to be converted -->
            <td scope="row">
                <select class="form-select to_be_converted to_be_converted_${count}" data-point="${count}">
                <option value="adowlie" selected>adowlie</option>
        <option value="amphora">amphora</option>
        <option value="chungah">chungah</option>
        <option value="congius">congius</option>
        <option value="cran">cran</option>
        <option value="hekat">hekat</option>
        <option value="koku">koku</option>
        <option value="peck">peck</option>
        <option value="puddee">puddee</option>
        <option value="shipping_ton">shipping ton</option>
                </select>
                </td>
                <!-- User input -->
                <td><input type="number" class="form-control input input_${count}" data-point="${count}"></td>
                <!-- Convert to -->
                <td>
                <option value="ml" selected>milliliters</option>
                <option value="l">liters</option>
                <option value="cub_mtr">cubic meters</option>
                </select>
            </td>
            <td style="display: flex;">
                <!-- Result input -->
                <input type="number" class="form-control" id="result_${count}" disabled>
                <!-- Copy button -->
                <a tabindex="0" class="btn btn-secondary" id="copy_${count}" role="button" style="border: none;"
                        data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top"
                        data-bs-content="Copied" data-bs-trigger="focus">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-clipboard" viewBox="0 0 16 16">
                            <path
                                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                            <path
                                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                        </svg>
                    </a>
            </td>
            <td>
                <!-- Delete button -->
                <button type="button" title="Delete row" class="btn btn-danger" id="delete_${count}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path
                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                </button>
            </td>
        `;
        let tr = document.createElement('tr');
        tr.innerHTML = newHTML;
        document.querySelector('tbody').appendChild(tr);
        // add listener for input 
        let new_input = document.querySelector(`.input_${count}`);
        new_input.addEventListener('input', convert);
        // delete row
        const current_delete = document.querySelector(`#delete_${count}`);
        current_delete.addEventListener('click', () => {
            current_delete.parentElement.parentElement.remove();
        });
        // dynamically change select 
        const current_convert_to = document.querySelector(`.to_be_converted_${count}`);
        current_convert_to.children[count % 10].selected = 'selected';
        // increase count
        count++;
    }
    else {
        // create html and add to the table
        const newHTML = `
            <!-- The value to be converted -->
            <td scope="row">
                <select class="form-select to_be_converted to_be_converted_${count}" data-point="${count}">
                <option value="ald" selected>ald</option>
                <option value="alen">alen</option>
                <option value="arabic_mile">arabic mile</option>
                <option value="bamboo">bamboo</option>
                <option value="barleycorn">barleycorn</option>
                <option value="cana">cana</option>
                <option value="girah">girah</option>
                <option value="macedonian_cubit">macedonian cubit</option>
                <option value="pes">pes</option>
                <option value="unglie">unglie</option>
                </select>
                </td>
                <!-- User input -->
                <td><input type="number" class="form-control input input_${count}" data-point="${count}"></td>
                <!-- Convert to -->
                <td>
                <select class="form-select convert_to convert_to_${count}" data-point="${count}">
                    <option value="mm" selected>millimeters</option>
                    <option value="cm">centimeters</option>
                    <option value="m">meters</option>
                    <option value="km">kilometers</option>
                </select>
            </td>
            <td style="display: flex;">
                <!-- Result input -->
                <input type="number" class="form-control" id="result_${count}" disabled>
                <!-- Copy button -->
                <a tabindex="0" class="btn btn-secondary" id="copy_${count}" role="button" style="border: none;"
                        data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top"
                        data-bs-content="Copied" data-bs-trigger="focus">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-clipboard" viewBox="0 0 16 16">
                            <path
                                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                            <path
                                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                        </svg>
                    </a>
            </td>
            <td>
                <!-- Delete button -->
                <button type="button" title="Delete row" class="btn btn-danger" id="delete_${count}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path
                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                </button>
            </td>
        `;
        const tr = document.createElement('tr');
        tr.innerHTML = newHTML;
        document.querySelector('tbody').appendChild(tr);
        // add listener for input 
        const new_input = document.querySelector(`.input_${count}`);
        new_input.addEventListener('input', convert);
        // delete row
        const current_delete = document.querySelector(`#delete_${count}`);
        current_delete.addEventListener('click', () => {
            current_delete.parentElement.parentElement.remove();
        });
        // dynamically change select 
        const current_convert_to = document.querySelector(`.to_be_converted_${count}`);
        current_convert_to.children[count % 10].selected = 'selected';
        // increase count
        count++;
    }
    // initialize a poper for new button
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});
// listen for metric change
metric_select.addEventListener('change', () => {
    if (metric_select.value == 'weight') {
        const to_be_converted_html = `
        <option value="abucco">abucco</option>
        <option value="bag">bag</option>
        <option value="candy">candy</option>
        <option value="dharni">dharni</option>
        <option value="dutch_cask">dutch cask</option>
        <option value="faggot">faggot</option>
        <option value="lot">lot</option>
        <option value="oka">oka</option>
        <option value="tank">tank</option>
        <option value="whey">whey</option>     
        `;
        const convert_to_html = `
        <option value="gr" selected>grams</option>
        <option value="kg">kilograms</option>
        <option value="t">tonne</option>
        `;
        // append html to all matched elements
        const to_be_converted_elements = document.querySelectorAll('.to_be_converted');
        const convert_to_elements = document.querySelectorAll('.convert_to');
        to_be_converted_elements.forEach(el => el.innerHTML = to_be_converted_html);
        convert_to_elements.forEach(el => el.innerHTML = convert_to_html);
        // dynamically update selected values 
        let count = 0;
        to_be_converted_elements.forEach(el => {
            el.children[count % 10].selected = 'selected';
            count++;
        });
    }
    else if (metric_select.value == 'volume') {
        const to_be_converted_html = `
        <option value="adowlie" selected>adowlie</option>
        <option value="amphora">amphora</option>
        <option value="chungah">chungah</option>
        <option value="congius">congius</option>
        <option value="cran">cran</option>
        <option value="hekat">hekat</option>
        <option value="koku">koku</option>
        <option value="peck">peck</option>
        <option value="puddee">puddee</option>
        <option value="shipping_ton">shipping ton</option> 
        `;
        const convert_to_html = `
        <option value="ml" selected>milliliters</option>
        <option value="l">liters</option>
        <option value="cub_mtr">cubic meters</option>
        `;
        // append html to all matched elements
        const to_be_converted_elements = document.querySelectorAll('.to_be_converted');
        const convert_to_elements = document.querySelectorAll('.convert_to');
        to_be_converted_elements.forEach(el => el.innerHTML = to_be_converted_html);
        convert_to_elements.forEach(el => el.innerHTML = convert_to_html);
        // dynamically update selected values 
        let count = 0;
        to_be_converted_elements.forEach(el => {
            el.children[count % 10].selected = 'selected';
            count++;
        });
    }
    else {
        const to_be_converted_html = `
        <option value="ald" selected>ald</option>
        <option value="alen">alen</option>
        <option value="arabic_mile">arabic mile</option>
        <option value="bamboo">bamboo</option>
        <option value="barleycorn">barleycorn</option>
        <option value="cana">cana</option>
        <option value="girah">girah</option>
        <option value="macedonian_cubit">macedonian cubit</option>
        <option value="pes">pes</option>
        <option value="unglie">unglie</option>
        `;
        const convert_to_html = `
        <option value="mm" selected>millimeters</option>
        <option value="cm">centimeters</option>
        <option value="m">meters</option>
        <option value="km">kilometers</option>
        `;
        // append html to all matched elements
        const to_be_converted_elements = document.querySelectorAll('.to_be_converted');
        const convert_to_elements = document.querySelectorAll('.convert_to');
        to_be_converted_elements.forEach(el => el.innerHTML = to_be_converted_html);
        convert_to_elements.forEach(el => el.innerHTML = convert_to_html);
        // dynamically update selected values 
        let count = 0;
        to_be_converted_elements.forEach(el => {
            el.children[count % 10].selected = 'selected';
            count++;
        });
    }
    // Clear all input values 
    const all_inputs = document.querySelectorAll("input");
    all_inputs.forEach(input => input.value = '');
});
// MOBILE
const metric_select_mobile = document.querySelector('.metric_select_mobile'), to_be_converted_mobile = document.querySelector('.to_be_converted_mobile'), convert_to_mobile = document.querySelector('.convert_to_mobile'), input_mobile = document.querySelector('#input_mobile'), mobile_result = document.querySelector('#mobile_result'), copy_mobile = document.querySelector('.copy_mobile');
// Listen for metric changes and update html
metric_select_mobile.addEventListener('click', () => {
    if (metric_select_mobile.value == 'weight') {
        const html_for_to_be_converted = `
        <option value="adowlie" selected>adowlie</option>
        <option value="amphora">amphora</option>
        <option value="chungah">chungah</option>
        <option value="congius">congius</option>
        <option value="cran">cran</option>
        <option value="hekat">hekat</option>
        <option value="koku">koku</option>
        <option value="peck">peck</option>
        <option value="puddee">puddee</option>
        <option value="shipping_ton">shipping ton</option> 
        `;
        const html_for_convert_to = `
        <option value="ml" selected>milliliters</option>
        <option value="l">liters</option>
        <option value="cub_mtr">cubic meters</option>
        `;
        // change html
        to_be_converted_mobile.innerHTML = html_for_to_be_converted;
        convert_to_mobile.innerHTML = html_for_convert_to;
    }
    else if (metric_select_mobile.value == 'volume') {
        const html_for_to_be_converted = `
        <option value="adowlie" selected>adowlie</option>
        <option value="amphora">amphora</option>
        <option value="chungah">chungah</option>
        <option value="congius">congius</option>
        <option value="cran">cran</option>
        <option value="hekat">hekat</option>
        <option value="koku">koku</option>
        <option value="peck">peck</option>
        <option value="puddee">puddee</option>
        <option value="shipping_ton">shipping ton</option> 
        `;
        const html_for_convert_to = `
        <option value="ml" selected>milliliters</option>
        <option value="l">liters</option>
        <option value="cub_mtr">cubic meters</option>
        `;
        // change html
        to_be_converted_mobile.innerHTML = html_for_to_be_converted;
        convert_to_mobile.innerHTML = html_for_convert_to;
    }
    else {
        const html_for_to_be_converted = `
        <option value="ald" selected>ald</option>
        <option value="alen">alen</option>
        <option value="arabic_mile">arabic mile</option>
        <option value="bamboo">bamboo</option>
        <option value="barleycorn">barleycorn</option>
        <option value="cana">cana</option>
        <option value="girah">girah</option>
        <option value="macedonian_cubit">macedonian cubit</option>
        <option value="pes">pes</option>
        <option value="unglie">unglie</option>
        `;
        const html_for_convert_to = `
        <option value="mm" selected>millimeters</option>
        <option value="cm">centimeters</option>
        <option value="m">meters</option>
        <option value="km">kilometers</option>
        `;
        // change html
        to_be_converted_mobile.innerHTML = html_for_to_be_converted;
        convert_to_mobile.innerHTML = html_for_convert_to;
    }
});
// listen for input
input_mobile.addEventListener('input', function () {
    if (Number(input_mobile.value) <= 0) {
        mobile_result.value = '';
        return;
    }
    else if (!Number.isSafeInteger(+input_mobile.value)) {
        // get coordinates to bring an alert
        const html = document.documentElement, scroll_top = html.scrollTop, client_height = html.clientHeight, needed_coordinate = scroll_top + client_height - 80, 
        // assign coordinates to the alert
        alert = document.querySelector('.animationForAlert');
        alert.style.top = needed_coordinate + 'px';
        alert.classList.add('move');
        // remove class in a few seconds
        setTimeout(() => {
            alert.classList.remove('move');
        }, 5000);
        mobile_result.value = '';
        return;
    }
    else {
        // everything is good
        let final_value;
        final_value = mainObject[to_be_converted_mobile.value][convert_to_mobile.value] * +this.value;
        // update the result field
        mobile_result.value = final_value.toString();
    }
    // listen for converted metric changes
    [to_be_converted_mobile, convert_to_mobile].forEach(el => el.addEventListener('change', () => {
        const final_value = mainObject[to_be_converted_mobile.value][convert_to_mobile.value] * +this.value;
        // update the result field
        mobile_result.value = final_value.toString();
    }));
});
// Copy button
copy_mobile.addEventListener('click', () => {
    setTimeout(() => {
        const textarea = document.createElement('textarea');
        textarea.value = mobile_result.value;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }, 500);
});
//  MOBILE
// initialize popers
const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
});
