import Select from 'react-select';

export default function VenueSelector({ venues, onChange }) {
    const options = venues.map((v) => ({
        value: v,
        label: v,
    }));

    return <Select options={options} onChange={(opt) => onChange(opt?.value)} placeholder="Select venue" isClearable />;
}

