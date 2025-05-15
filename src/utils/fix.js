/**
 * 将时间戳格式化为 YYYY.MM.DD HH:mm 格式
 * @param {number} timestamp - 时间戳（毫秒）
 * @returns {string} 格式化后的时间字符串
 */
export function formatTime(timestamp) {
    const date = new Date(timestamp);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
}

/**
 * 格式化数字，将超过1000的数字转换为k格式，保留2位小数
 * @param {number} num - 需要格式化的数字
 * @returns {string} 格式化后的字符串
 * 
 * 示例:
 * formatNumber(999) => "999"
 * formatNumber(1000) => "1.00k"
 * formatNumber(6433) => "6.43k"
 * formatNumber(10500) => "10.50k"
 */
export function formatNumber(num) {
    if (num < 1000) {
        return num.toString();
    }
    return (num / 1000).toFixed(2) + 'k';
}

// 使用示例:
// const timestamp = Date.now();
// const formattedDate = formatTimestamp(timestamp);
// console.log(formattedDate); // 输出格式: 2025.12.22 15:00


