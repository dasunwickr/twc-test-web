import maleImage from "../assets/table/pic_m.png";
import femaleImage from "../assets/table/pic_f.png";
import { Icon } from "@iconify/react";

const TableComponent = () => {
  const data = [
    {
      fullName: "John Doe",
      gender: "male",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
    },
    {
      fullName: "Jane Doe",
      gender: "female",
      email: "jane.doe@example.com",
      phoneNumber: "0987654321",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-4 mx-64">
      <table className="w-full  table-auto">
        <thead>
          <tr className="text-left">
            <th className="w-1/4"></th>
            <th className="w-1/4">Full Name</th>
            <th className="w-1/6">Gender</th>
            <th className="w-1/3">Email</th>
            <th className="w-1/4">Phone Number</th>
            <th className="w-1"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2">
                <img
                  src={row.gender === "male" ? maleImage : femaleImage}
                  alt={row.gender === "male" ? "Male" : "Female"}
                  style={{ width: 24, height: 24 }}
                />
              </td>
              <td className="p-2">{row.fullName}</td>
              <td className="p-2">{row.gender}</td>
              <td className="p-2">{row.email}</td>
              <td className="p-2">{row.phoneNumber}</td>
              <td className="p-2 flex gap-2">
                <Icon
                  icon="mdi:trash-can-outline"
                  style={{ fontSize: "24px", cursor: "pointer" }}
                  onClick={() => alert(`Deleting row: ${row.fullName}`)}
                />
                <Icon
                  icon="mdi:pencil"
                  style={{ fontSize: "24px", cursor: "pointer" }}
                  onClick={() => alert(`Editing row: ${row.fullName}`)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
