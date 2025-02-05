import { format } from "date-fns";

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
  className: string
}

export default function DatePicker({ selectedDate, onChange, className }: DatePickerProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    onChange(newDate);
  };

  return (
    <div className="relative w-full">
      <input
        type="date"
        className={`w-full bg-white border border-primaryPurple rounded-lg p-2 text-primaryPurple focus:ring-2 focus:ring-primaryPurple cursor-pointer ${className}`}
        value={format(selectedDate, "yyyy-MM-dd")}
        onChange={handleDateChange}
        onInput={handleDateChange} // Captura a mudança de valor no clique
        onKeyDown={(e) => e.preventDefault()} // Impede a digitação manual
      />
    </div>
  );
}
