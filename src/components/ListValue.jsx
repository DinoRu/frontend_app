import React, { useEffect, useState } from "react";
import "./listvalue.css";

const ListValue = () => {
  const [values, setValues] = useState([]);
  const [sum, setSum] = useState(0);

  const getValues = async () => {
    const response = await fetch("http://localhost:3000/api/values");
    const data = await response.json();
    setValues(data);
    //Calculate sum
    const total = data.reduce((acc, item) => acc + item.value, 0);
    setSum(total);
  };

  useEffect(() => {
    getValues();
  }, []);

  //Calculate the result of sum/3200
  const result = sum / 3200;
  return (
    <div className="container">
      <div className="fixed-section bg-white w-75">
        <h2 className="text-center">ТЕХ-УЧЕТ</h2>
        <div className="d-flex mt-4 justify-content-around border border-secondary py-2">
          <div className="left fs-4">Предаточное число счетчика</div>
          <div className="right fs-4">3200 imp-kw/h</div>
        </div>
        <hr />
        <div>
          <table className="table table-bordered border-secondary text-center">
            <thead>
              <tr>
                <th>Сумма импульсов</th>
                <th>Мощность потребления</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{sum}</td>
                <td>{result.toFixed(4)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-flex scrollable-content">
        <table className="table table-bordered border-secondary text-center">
          <colgroup>
            <col style={{ width: "50%" }} />
            <col style={{ width: "50%" }} />
          </colgroup>
          <thead>
            <tr>
              <th colSpan={2} className="text-center">
                Входящий импульс за 5 минут
              </th>
            </tr>
            <tr>
              <th>Дата и время</th>
              <th>Значение</th>
            </tr>
          </thead>
          <tbody>
            {values.map((item) => (
              <tr key={item.number_id}>
                <td>{item.timestamp}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListValue;
