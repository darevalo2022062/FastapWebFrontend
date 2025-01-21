import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export const ModelSelect = ({
    defaultValue = [],
    options,
    onChange,
    value,
    text,
    errors,
    name
}) => {
    const [selectedOptions, setSelectedOptions] = useState(
        value.map(val => ({
            value: options.find(option => option._id === val)?._id || val,
            label: options.find(option => option._id === val)?.name || val
        }))
    );

    if (selectedOptions.length == 0 && defaultValue.length > 0) {
        setSelectedOptions(defaultValue);
    }

    useEffect(() => {
        setSelectedOptions(
            value.map(val => ({
                value: options.find(option => option._id === val)?._id || val,
                label: options.find(option => option._id === val)?.name || val
            }))
        );
    }, [value, options]);

    const handleChange = (selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];

        setSelectedOptions(selectedOptions);

        onChange(selectedValues);
    };

    return (
        <>
            <label className="block mb-2 font-semibold text-xs text-gray-500">
                {text}
            </label>
            <div>
                <Select
                    isMulti
                    options={options.map(option => ({
                        value: option._id,
                        label: option.name
                    }))}
                    value={selectedOptions}
                    onChange={handleChange}
                    className={`text-sm w-full outline-none ${errors[name] ? 'border-red-500' : ''}`}
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    styles={{
                        menu: (provided) => ({
                            ...provided,
                            maxHeight: '120px'
                        }),
                        menuList: (provided) => ({
                            ...provided,
                            maxHeight: '120px',
                        }),
                    }}
                />
            </div>
            {errors[name] && (
                <span className="text-red-500 text-xs mt-1">
                    {errors[name].message}
                </span>
            )}
        </>
    );
};
