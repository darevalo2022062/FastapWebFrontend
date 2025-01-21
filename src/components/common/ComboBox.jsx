export const ComboBox = ({
    actualSelected,
    colorLabel,
    text,
    id,
    options,
    register,
    name,
    errors,
    validation,
    optionValue = "value", // Propiedad por defecto para el valor
    optionLabel = "label", // Propiedad por defecto para el texto
}) => {
    return (
        <>
            <label
                htmlFor={id}
                className={`block mb-2 font-semibold text-xs ${colorLabel}`}>
                {text}
            </label>
            <select
                aria-label={text}
                id={id}
                defaultValue={actualSelected || ""} // Establece la opción seleccionada inicialmente
                className={`border rounded-lg px-3 py-2 text-sm w-full outline-none ${errors[name] ? 'border-red-500' : ''}`}
                {...(register && register(name, validation))}
            >
                <option value="" disabled hidden>Selecciona una opción</option> {/* Opción predeterminada */}
                {options.map((option, index) => (
                    <option key={index} value={option[optionValue]}>
                        {option[optionLabel]}
                    </option>
                ))}
            </select>
            {errors[name] && (
                <span className="text-red-500 text-xs mt-1">
                    {errors[name].message}
                </span>
            )}
        </>
    );
};
