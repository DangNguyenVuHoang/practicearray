let numberArray = [];
let floatArray = [];

// Thêm số vào mảng
function addNumber() {
    const input = document.getElementById('numberInput');
    const value = parseInt(input.value);
    
    if (!isNaN(value)) {
        numberArray.push(value);
        updateArrayDisplay();
        input.value = '';
        input.focus();
    } else {
        alert('Vui lòng nhập số nguyên hợp lệ');
    }
}

// Xóa mảng
function clearArray() {
    numberArray = [];
    floatArray = [];
    updateArrayDisplay();
    clearResult();
}

// Cập nhật hiển thị mảng
function updateArrayDisplay() {
    const display = document.getElementById('arrayDisplay');
    display.textContent = `Mảng hiện tại: [${numberArray.join(', ')}]`;
}

// Xóa kết quả
function clearResult() {
    document.getElementById('resultContent').textContent = '';
    document.getElementById('additionalInputs').innerHTML = '';
}

// Thực hiện chức năng
function executeFunction(funcNumber) {
    clearResult();
    
    switch(funcNumber) {
        case 1:
            sumOfPositives();
            break;
        case 2:
            countPositives();
            break;
        case 3:
            findMin();
            break;
        case 4:
            findMinPositive();
            break;
        case 5:
            findLastEven();
            break;
        case 6:
            showSwapInputs();
            break;
        case 7:
            sortArray();
            break;
        case 8:
            findFirstPrime();
            break;
        case 9:
            showFloatArrayInput();
            break;
        case 10:
            comparePositivesNegatives();
            break;
        default:
            document.getElementById('resultContent').textContent = 'Chức năng không tồn tại';
    }
}

// 1. Tổng các số dương trong mảng
function sumOfPositives() {
    const sum = numberArray.reduce((acc, num) => num > 0 ? acc + num : acc, 0);
    document.getElementById('resultContent').textContent = `Tổng các số dương trong mảng: ${sum}`;
}

// 2. Đếm có bao nhiêu số dương trong mảng
function countPositives() {
    const count = numberArray.filter(num => num > 0).length;
    document.getElementById('resultContent').textContent = `Số lượng số dương trong mảng: ${count}`;
}

// 3. Tìm số nhỏ nhất trong mảng
function findMin() {
    if (numberArray.length === 0) {
        document.getElementById('resultContent').textContent = 'Mảng rỗng';
        return;
    }
    const min = Math.min(...numberArray);
    document.getElementById('resultContent').textContent = `Số nhỏ nhất trong mảng: ${min}`;
}

// 4. Tìm số dương nhỏ nhất trong mảng
function findMinPositive() {
    const positives = numberArray.filter(num => num > 0);
    if (positives.length === 0) {
        document.getElementById('resultContent').textContent = 'Không có số dương trong mảng';
        return;
    }
    const min = Math.min(...positives);
    document.getElementById('resultContent').textContent = `Số dương nhỏ nhất trong mảng: ${min}`;
}

// 5. Tìm số chẵn cuối cùng trong mảng
function findLastEven() {
    for (let i = numberArray.length - 1; i >= 0; i--) {
        if (numberArray[i] % 2 === 0) {
            document.getElementById('resultContent').textContent = `Số chẵn cuối cùng trong mảng: ${numberArray[i]}`;
            return;
        }
    }
    document.getElementById('resultContent').textContent = `Không tìm thấy số chẵn trong mảng: -1`;
}

// 6. Đổi chỗ 2 giá trị trong mảng
function showSwapInputs() {
    const additionalInputs = document.getElementById('additionalInputs');
    additionalInputs.innerHTML = `
        <p>Nhập 2 vị trí muốn đổi chỗ (0 - ${numberArray.length - 1}):</p>
        <input type="number" id="pos1" placeholder="Vị trí 1" min="0" max="${numberArray.length - 1}">
        <input type="number" id="pos2" placeholder="Vị trí 2" min="0" max="${numberArray.length - 1}">
        <button onclick="swapValues()">Đổi chỗ</button>
    `;
}

function swapValues() {
    const pos1 = parseInt(document.getElementById('pos1').value);
    const pos2 = parseInt(document.getElementById('pos2').value);
    
    if (isNaN(pos1) || isNaN(pos2)) {
        alert('Vui lòng nhập 2 vị trí hợp lệ');
        return;
    }
    
    if (pos1 < 0 || pos1 >= numberArray.length || pos2 < 0 || pos2 >= numberArray.length) {
        alert(`Vị trí phải từ 0 đến ${numberArray.length - 1}`);
        return;
    }
    
    // Thực hiện đổi chỗ
    [numberArray[pos1], numberArray[pos2]] = [numberArray[pos2], numberArray[pos1]];
    updateArrayDisplay();
    document.getElementById('resultContent').textContent = `Đã đổi chỗ vị trí ${pos1} và ${pos2}. Mảng mới: [${numberArray.join(', ')}]`;
    document.getElementById('additionalInputs').innerHTML = '';
}

// 7. Sắp xếp mảng theo thứ tự tăng dần
function sortArray() {
    numberArray.sort((a, b) => a - b);
    updateArrayDisplay();
    document.getElementById('resultContent').textContent = `Mảng sau khi sắp xếp: [${numberArray.join(', ')}]`;
}

// 8. Tìm số nguyên tố đầu tiên trong mảng
function findFirstPrime() {
    function isPrime(num) {
        if (num <= 1) return false;
        if (num === 2) return true;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }
    
    for (const num of numberArray) {
        if (isPrime(num)) {
            document.getElementById('resultContent').textContent = `Số nguyên tố đầu tiên trong mảng: ${num}`;
            return;
        }
    }
    
    document.getElementById('resultContent').textContent = `Không tìm thấy số nguyên tố trong mảng: -1`;
}

// 9. Nhập thêm 1 mảng số thực, tìm xem trong mảng có bao nhiêu số nguyên?
function showFloatArrayInput() {
    const additionalInputs = document.getElementById('additionalInputs');
    additionalInputs.innerHTML = `
        <p>Nhập mảng số thực (phân cách bằng dấu phẩy):</p>
        <input type="text" id="floatArrayInput" placeholder="Ví dụ: 1.5, 2, 3.7, 4">
        <button onclick="countIntegersInFloatArray()">Đếm số nguyên</button>
    `;
}

function countIntegersInFloatArray() {
    const input = document.getElementById('floatArrayInput').value;
    if (!input.trim()) {
        alert('Vui lòng nhập mảng số thực');
        return;
    }
    
    try {
        floatArray = input.split(',').map(item => parseFloat(item.trim()));
        const count = floatArray.filter(num => Number.isInteger(num)).length;
        document.getElementById('resultContent').textContent = 
            `Mảng số thực: [${floatArray.join(', ')}] có ${count} số nguyên`;
        document.getElementById('additionalInputs').innerHTML = '';
    } catch (e) {
        alert('Định dạng nhập vào không hợp lệ');
    }
}

// 10. So sánh số lượng số dương và số lượng số âm
function comparePositivesNegatives() {
    const positives = numberArray.filter(num => num > 0).length;
    const negatives = numberArray.filter(num => num < 0).length;
    
    let result;
    if (positives > negatives) {
        result = "Số dương nhiều hơn số âm";
    } else if (negatives > positives) {
        result = "Số âm nhiều hơn số dương";
    } else {
        result = "Số dương và số âm bằng nhau";
    }
    
    document.getElementById('resultContent').textContent = 
        `Số dương: ${positives}, Số âm: ${negatives}. Kết quả: ${result}`;
}