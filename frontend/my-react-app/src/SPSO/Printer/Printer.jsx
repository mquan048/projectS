import React, { useEffect, useState } from "react";
import "./Printer.css";
import printerImg from "../../../../src/assets/printer.png";
import axios from "axios";

const Printer = () => {
  const [printers, setPrinters] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [showModal, setShowModal] = useState(false);
  const [editingPrinter, setEditingPrinter] = useState(null);
  const [newPrinter, setNewPrinter] = useState({
    name: "",
    brand: "",
    model: "",
    campus: "",
    building: "",
    room: "",
  });
  useEffect(() => {
    fetchPrinter();
  }, []);
  const fetchPrinter = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/printer");
      setPrinters(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching printers:", error);
    }
  };

  const addPrinter = async (newprinter) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Access token not found!");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/api/printer",
        newprinter,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Add printer into db success");
    } catch (error) {
      console.error("Error adding printers:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrinter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPrinter = async () => {
    if (
      !newPrinter.name ||
      !newPrinter.brand ||
      !newPrinter.model ||
      !newPrinter.campus ||
      !newPrinter.building ||
      !newPrinter.room
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      await addPrinter(newPrinter); // Thêm máy in mới
      await fetchPrinter(); // Cập nhật danh sách máy in
      setShowModal(false); // Đóng modal sau khi thêm thành công
      setNewPrinter({
        name: "",
        brand: "",
        model: "",
        campus: "",
        building: "",
        room: "",
      }); // Đặt lại form
    } catch (error) {
      console.error("Error in handleAddPrinter:", error);
      alert("Failed to add printer. Please try again.");
    }
  };

  const handleChangeStatus = async (printer_id) => {
    try {
      const printer = printers.find((p) => p.printer_id === printer_id);
      if (!printer) return;

      const newState =
        printer.state === "active"
          ? "inactive"
          : printer.state === "inactive"
          ? "maintenance"
          : "active";

      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Access token not found!");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/printer/change-state/${printer_id}`,
        { state: newState },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("After change state:");
      console.log(response);

      // Cập nhật trạng thái trong state
      //  setPrinters((prevPrinters) =>
      //   prevPrinters.map((p) =>
      //     p.printer_id === printer_id
      //       ? { ...p, state: response.data.state, updated_at: response.data.updated_at }
      //       : p
      //   )
      // );
      await fetchPrinter();
    } catch (error) {
      console.error("Error changing printer status:", error);
    }
  };

  const handleUpdatePrinter = async (id, updatedPrinter) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Access token not found!");
        return;
      }
      const response = await axios.put(
        `http://localhost:5000/api/printer/update/${id}`,
        updatedPrinter,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Updated printer successfully:", response.data);
      await fetchPrinter(); // Refresh the printer list
    } catch (error) {
      console.error("Error updating printer:", error);
      alert("Failed to update the printer. Please try again.");
    }
  };
  const handleEditPrinter = (printer) => {
    setEditingPrinter(printer);
    setShowModal(true);
  };
  const handleSaveEditPrinter = async () => {
    if (!editingPrinter) return;
    await handleUpdatePrinter(editingPrinter.printer_id, editingPrinter);
    setEditingPrinter(null);
    setShowModal(false);
  };
  const sortedPrinters = React.useMemo(() => {
    let sortablePrinters = [...printers];
    sortablePrinters.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sortablePrinters;
  }, [printers, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      if (key === "name") {
        return sortConfig.direction === "ascending" ? " (A-Z)" : " (Z-A)";
      } else if (key === "created_at") {
        return sortConfig.direction === "ascending"
          ? " (Xa nhất)"
          : " (Mới nhất)";
      }
    }
    return "";
  };

  return (
    <div className="container-printer-management">
      <div className="printer-management">
        <header className="header">
          <h1>Printer Management</h1>
          <div className="sort-toolbar">
            <button onClick={() => requestSort("name")}>
              Sắp xếp theo Tên{getSortIndicator("name")}
            </button>
            <button onClick={() => requestSort("created_at")}>
              Sắp xếp theo Ngày tạo{getSortIndicator("created_at")}
            </button>
          </div>
          <div className="toolbar">
            <button className="add-button" onClick={() => setShowModal(true)}>
              + Add Printer
            </button>
          </div>
        </header>

        <div className="printer-list">
          {sortedPrinters.map((printer) => (
            <div key={printer.printer_id} className="printer-item">
              <div className="printer-header">
                <div className="printer-image">
                  <img src={printerImg} alt="Printer" />
                </div>
                <div className="printer-title">
                  <h2>{printer.name}</h2>
                  <p className={`status-badge ${printer.state}`}>
                    {printer.state}
                  </p>
                </div>
              </div>
              <div className="printer-info">
                <div className="info-group">
                  <p>
                    <strong>Brand:</strong> {printer.brand}
                  </p>
                  <p>
                    <strong>Model:</strong> {printer.model}
                  </p>
                  <p>
                    <strong>Campus:</strong> {printer.campus}
                  </p>
                </div>
                <div className="info-group">
                  <p>
                    <strong>Building:</strong> {printer.building}
                  </p>
                  <p>
                    <strong>Room:</strong> {printer.room}
                  </p>
                  <p>
                    <strong>Created At:</strong> {printer.created_at}
                  </p>
                </div>
                <div className="info-group">
                  <p>
                    <strong>Updated At:</strong> {printer.updated_at}
                  </p>
                </div>
              </div>
              <div className="printer-footer">
                <button
                  className="status-button"
                  onClick={() => handleChangeStatus(printer.printer_id)}
                >
                  Change Status
                </button>
                <button
                  className="remove-button"
                  onClick={() => handleEditPrinter(printer)}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add New Printer</h2>
              {/* Input Fields */}
              <input
                type="text"
                name="name"
                placeholder="Printer Name"
                value={newPrinter.name}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={newPrinter.brand}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                type="text"
                name="model"
                placeholder="Model"
                value={newPrinter.model}
                onChange={handleInputChange}
                className="input-field"
              />
              {/* <select
                name="state"
                value={newPrinter.state}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select> */}
              <input
                type="text"
                name="campus"
                placeholder="Campus"
                value={newPrinter.campus}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                type="text"
                name="building"
                placeholder="Building"
                value={newPrinter.building}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                type="text"
                name="room"
                placeholder="Room"
                value={newPrinter.room}
                onChange={handleInputChange}
                className="input-field"
              />
              {/* More Fields */}
              <div className="modal-actions">
                <button className="save-button" onClick={handleAddPrinter}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showModal && editingPrinter && (
          <div className="modal">
            <div className="modal-content">
              <h2>Edit Printer</h2>
              <input
                type="text"
                name="name"
                placeholder="Printer Name"
                value={editingPrinter.name}
                onChange={(e) =>
                  setEditingPrinter({ ...editingPrinter, name: e.target.value })
                }
                className="input-field"
              />
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={editingPrinter.brand}
                onChange={(e) =>
                  setEditingPrinter({
                    ...editingPrinter,
                    brand: e.target.value,
                  })
                }
                className="input-field"
              />
              <input
                type="text"
                name="model"
                placeholder="Model"
                value={editingPrinter.model}
                onChange={(e) =>
                  setEditingPrinter({
                    ...editingPrinter,
                    model: e.target.value,
                  })
                }
                className="input-field"
              />
              <input
                type="text"
                name="campus"
                placeholder="Campus"
                value={editingPrinter.campus}
                onChange={(e) =>
                  setEditingPrinter({
                    ...editingPrinter,
                    campus: e.target.value,
                  })
                }
                className="input-field"
              />
              <input
                type="text"
                name="building"
                placeholder="Building"
                value={editingPrinter.building}
                onChange={(e) =>
                  setEditingPrinter({
                    ...editingPrinter,
                    building: e.target.value,
                  })
                }
                className="input-field"
              />
              <input
                type="text"
                name="room"
                placeholder="Room"
                value={editingPrinter.room}
                onChange={(e) =>
                  setEditingPrinter({ ...editingPrinter, room: e.target.value })
                }
                className="input-field"
              />
              <div className="modal-actions">
                <button className="save-button" onClick={handleSaveEditPrinter}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingPrinter(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Printer;
