export const Input = ({ label, type, name, value, onChange, placeholder }) => {
    return (
        <div className="mb-6">
            <label className="block text-customDarkGray text-sm font-semibold mb-2" htmlFor={name}>
                {label}
            </label>
            <input
                className="appearance-none border border-customLightBlue rounded-lg w-full py-3 px-4 text-customDarkGray bg-customWhite leading-tight focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent transition-all"
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};
