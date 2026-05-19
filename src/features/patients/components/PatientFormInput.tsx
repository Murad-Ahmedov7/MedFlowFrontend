type Props = {
  label: string;
  error?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function PatientFormInput({ label, error,required, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="
          text-xs uppercase
          tracking-wide
          text-gray-500
          font-semibold
        "
      >
        {label}

        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        {...props}
        className="
          w-full
          px-4 py-3
          rounded-xl
          border border-gray-300
          bg-white
          text-gray-800
          placeholder:text-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-cyan-500
          focus:border-cyan-500
          transition
          shadow-sm
        "
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
