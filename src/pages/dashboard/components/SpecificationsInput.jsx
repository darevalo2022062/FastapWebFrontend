import React, { useEffect, useRef } from 'react';
import { useFieldArray } from 'react-hook-form';

export const SpecificationsInput = ({ control, register, errors }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'specifications'
    });

    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [fields.length]);

    return (
        <div className="mb-4">
            <h3 className="text-gray-500 block mb-2 font-semibold text-xs">Especificaciones</h3>
            <div className='flex h-12'>
                <div
                    ref={containerRef}
                    className="max-h-12 h-12 w-full overflow-y-auto border rounded-lg p-2 mr-2 space-y-2 self-end"
                >
                    {fields.map((item, index) => (
                        <div key={item.id} className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Título"
                                {...register(`specifications[${index}].title`, {
                                    required: "El título es obligatorio",
                                    minLength: {
                                        value: 3,
                                        message: "Debe tener al menos 3 caracteres"
                                    }
                                })}
                                className="w-1/3 p-2 border rounded h-8"
                            />
                            <input
                                type="text"
                                placeholder="Detalle"
                                {...register(`specifications[${index}].detail`, {
                                    required: "El detalle es obligatorio",
                                    minLength: {
                                        value: 3,
                                        message: "Debe tener al menos 3 caracteres"
                                    }
                                })}
                                className="w-2/3 p-2 border rounded h-8"
                            />
                            <button type="button" onClick={() => remove(index)} className="text-red-500 text-lg">
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => append({ title: '', detail: '' })}
                    className="mt-1 bg-customBlue text-white p-1 w-10 h-10 rounded-lg"
                >
                    +
                </button>
            </div>
        </div>
    );
};
