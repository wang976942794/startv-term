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

// 使用示例:
// const timestamp = Date.now();
// const formattedDate = formatTimestamp(timestamp);
// console.log(formattedDate); // 输出格式: 2025.12.22 15:00
