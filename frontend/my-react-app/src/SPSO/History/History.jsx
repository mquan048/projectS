import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './History.css';

function History() {
    const [printHistoryData, setHistoryData] = useState([]);
    const [beginAt, setBeginAt] = useState('2024-11-18T10:02:00');
    const [endAt, setEndAt] = useState('2024-11-18T10:10:00');
    const [page, setPage] = useState(1);

    const fetchDataHistory = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            const response = await axios.get("http://localhost:5000/api/print-order/filter", {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: {
                    begin_at: beginAt,
                    end_at: endAt,
                    page: page,
                },
            });
            setHistoryData(response.data);
        } catch (err) {
            console.error("Error fetching data:", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchDataHistory();
    }, [beginAt, endAt, page]);

    return (
        <div className="his-container">
            <h2>Lịch sử in</h2>
            <div className="filter-container">
                <div className="sub-filter">
                    <label>Chọn ngày bắt đầu</label>
                    <input
                        type="datetime-local"
                        value={beginAt}
                        onChange={(e) => setBeginAt(e.target.value)}
                    />
                </div>
                <div className="sub-filter">
                    <label>Chọn ngày kết thúc</label>
                    <input
                        type="datetime-local"
                        value={endAt}
                        onChange={(e) => setEndAt(e.target.value)}
                    />
                </div>
                <div className="sub-filter">
                    <label>Trang</label>
                    <input
                        type="number"
                        min="1"
                        value={page}
                        onChange={(e) => setPage(e.target.value)}
                    />
                </div>
            </div>

            <table className="print-history-table">
                <thead>
                    <tr>
                        <th>Mã số User</th>
                        <th>Số mặt</th>
                        <th>Cỡ giấy</th>
                        <th>Hướng giấy</th>
                        <th>Số trang mỗi mặt</th>
                        <th>Số bảng in</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Trạng thái</th>
                        <th>Xem chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {printHistoryData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.user_id}</td>
                            <td>{item.sided}</td>
                            <td>{item.paper_size}</td>
                            <td>{item.paper_orientation}</td>
                            <td>{item.pages_per_sheet}</td>
                            <td>{item.number_of_copies}</td>
                            <td>{new Date(item.start_time).toLocaleString()}</td>
                            <td>{new Date(item.end_time).toLocaleString()}</td>
                            <td><span className={`his-status-badge ${item.p_state}`}>{item.p_state}</span></td>
                            <td><button className="details-button">🔍</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default History;
