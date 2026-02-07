import Select from 'react-select';
import data from '../assets/subgroup.json';

const InputBox = ({ onChange }) => {
    const options = Object.entries(data).map(([value, label]) => ({
        value,
        label,
    }));

    return <Select options={options} onChange={onChange} placeholder="Select Subgroup" />;
};

export default InputBox;

