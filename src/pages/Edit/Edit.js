import './edit.css'
import { useEffect, useState } from 'react';
import PercentageInput from '../../components/PercentageInput';
function Edit() {
  const data = localStorage.getItem("percentageMoney");
  const datas = JSON.parse(data);
  const [values, setValues] = useState({
    '5k': datas['5k'],
    '10k': datas['10k'],
    '20k': datas['20k'],
    '50k': datas['50k'],
    '100k': datas['100k'],
    '200k': datas['200k'],
    '500k': datas['500k']
  });
  // Mặc định tỉ lệ khi người dùng chưa nhập
  const handleSubmit = (event) => {
    event.preventDefault();
    let sumPercent = 0;
    for(let i in values){
      console.log(i,parseInt(values[i]))
      sumPercent+=parseInt(values[i]);
    }
    if(sumPercent===100){
        localStorage.setItem('percentageMoney', JSON.stringify(values));
        alert('Giá trị đã được lưu!');
    }else{
        alert('Vui lòng nhập sao cho tổng tỉ lệ quay bằng 100')
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  return (
    <div className='edit'>
      <form onSubmit={handleSubmit}>
      <PercentageInput
          label="5K"
          name="5k"
          value={values['5k']}
          onChange={handleChange}
        />
        <PercentageInput
          label="10K"
          name="10k"
          value={values['10k']}
          onChange={handleChange}
        />
        <PercentageInput
          label="20K"
          name="20k"
          value={values['20k']}
          onChange={handleChange}
        />
        <PercentageInput
          label="50K"
          name="50k"
          value={values['50k']}
          onChange={handleChange}
        />
        <PercentageInput
          label="100K"
          name="100k"
          value={values['100k']}
          onChange={handleChange}
        />
        <PercentageInput
          label="200K"
          name="200k"
          value={values['200k']}
          onChange={handleChange}
        />
        <PercentageInput
          label="500K"
          name="500k"
          value={values['500k']}
          onChange={handleChange}
        />
        <button type="submit" className="button__submit btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Edit;
