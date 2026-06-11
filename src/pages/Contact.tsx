import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { Printer, Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type Plot = { plot_no: string; sy_no: string; sq_yards: string };

type FormState = {
  first_name_1: string; last_name_1: string; father_spouse_1: string; address_1: string; city_1: string; state_pin_1: string; contact_1: string;
  first_name_2: string; last_name_2: string; father_spouse_2: string; address_2: string; city_2: string; state_pin_2: string; contact_2: string;
  email: string; aadhar: string;
  plots: Plot[];
  signature_name: string;
  rep_name: string;
};

type StringFieldKey = Exclude<keyof FormState, "plots">;

const emptyPlot: Plot = { plot_no: "", sy_no: "", sq_yards: "" };

export default function MembershipForm() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const [form, setForm] = useState<FormState>({
    first_name_1: "", last_name_1: "", father_spouse_1: "", address_1: "", city_1: "", state_pin_1: "", contact_1: "",
    first_name_2: "", last_name_2: "", father_spouse_2: "", address_2: "", city_2: "", state_pin_2: "", contact_2: "",
    email: "", aadhar: "",
    plots: [
      { ...emptyPlot },
      { ...emptyPlot },
      { ...emptyPlot },
      { ...emptyPlot },
    ],
    signature_name: "",
    rep_name: "",
  });

  const setField = (key: StringFieldKey, val: string) => setForm(f => ({ ...f, [key]: val }));
  const setPlot = (i: number, key: keyof Plot, val: string) => setForm(f => {
    const plots = [...f.plots];
    plots[i] = { ...plots[i], [key]: val };
    return { ...f, plots };
  });

  const totalSqY = form.plots.reduce((s, p) => s + (parseFloat(p.sq_yards) || 0), 0);

  const handlePrint = () => window.print();

  const handleDownloadPDF = async () => {
    const el = formRef.current;
    if (!el) return;
    const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let y = 0;
    while (y < imgHeight) {
      pdf.addImage(imgData, "PNG", 0, -y, imgWidth, imgHeight);
      y += pageHeight;
      if (y < imgHeight) pdf.addPage();
    }
    pdf.save("POWA_Membership_Form.pdf");
  };

  return (
    <div className="min-h-screen text-black bg-gray-100 py-8 px-4">
      {/* Action Buttons */}
      <div className="max-w-3xl mx-auto mb-4 flex gap-3 justify-end print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>

        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Form Paper */}
      <div
        ref={formRef}
        id="printable"
        className="max-w-3xl mx-auto bg-white border border-gray-400 text-sm font-sans"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {/* Header */}
        <div className="text-center py-3 border-b border-gray-400">
          <h1 className="text-xl font-bold text-red-600 tracking-wide">
            JAGANNATHAPURAM PLOT OWNERS WELFARE ASSOCIATION
          </h1>
          <p className="text-xs mt-1 text-gray-700">(Regd. No. 614/2015)</p>
          <p className="text-xs text-blue-700 font-medium">
            5-5-858, Chintalkunta Old Check Post, Jahangir Nagar, L. B. Nagar, Hyderabad
          </p>
        </div>

        {/* Top grid rows (blank rows like in original) */}
        <div className="grid grid-cols-4 border-b border-gray-400">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-r last:border-r-0 border-gray-400 h-7" />
          ))}
        </div>
        <div className="grid grid-cols-4 border-b border-gray-400">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-r last:border-r-0 border-gray-400 h-7" />
          ))}
        </div>

        {/* Title */}
        <div className="text-center py-2 border-b border-gray-400 font-bold text-base">
          MEMBERSHIP FORM
        </div>

        {/* Applicant Headers */}
        <div className="grid border-b border-gray-400" style={{ gridTemplateColumns: "1fr 1fr 160px" }}>
          <div className="border-r border-gray-400 text-center py-1.5 font-medium text-xs bg-gray-50">1st Applicant</div>
          <div className="border-r border-gray-400 text-center py-1.5 font-medium text-xs bg-gray-50">2nd Applicant</div>
          <div className="py-1.5 text-xs" />
        </div>

        {/* First Name */}
        <FormRow label="First Name"
          left={<FInput value={form.first_name_1} onChange={v => setField("first_name_1", v)} />}
          right={<FInput value={form.first_name_2} onChange={v => setField("first_name_2", v)} />}
          photo="Affix Passport size photo - Applicant1"
          photoRows={4}
          firstPhotoRow
        />

        {/* Last Name */}
        <FormRow label="Last Name"
          left={<FInput value={form.last_name_1} onChange={v => setField("last_name_1", v)} />}
          right={<FInput value={form.last_name_2} onChange={v => setField("last_name_2", v)} />}
        />

        {/* Father/Spouse */}
        <FormRow label="Father/Spouse"
          left={<FInput value={form.father_spouse_1} onChange={v => setField("father_spouse_1", v)} />}
          right={<FInput value={form.father_spouse_2} onChange={v => setField("father_spouse_2", v)} />}
        />

        {/* Address */}
        <FormRow label="Address"
          left={<FInput value={form.address_1} onChange={v => setField("address_1", v)} />}
          right={<FInput value={form.address_2} onChange={v => setField("address_2", v)} />}
        />

        {/* Blank row */}
        <div className="grid border-b border-gray-400" style={{ gridTemplateColumns: "1fr 1fr 160px" }}>
          <div className="border-r border-gray-400 h-7" />
          <div className="border-r border-gray-400 h-7" />
          <div className="row-span-4 border-l border-gray-400 bg-gray-100 flex items-end justify-center pb-1 text-[10px] text-gray-500 text-center px-1" style={{ gridRow: "span 4" }}>
            Affix Passport size photo - Applicant2
          </div>
        </div>

        {/* City */}
        <FormRow label="City"
          left={<FInput value={form.city_1} onChange={v => setField("city_1", v)} />}
          right={<FInput value={form.city_2} onChange={v => setField("city_2", v)} />}
          noPhoto
        />

        {/* State-PIN */}
        <FormRow label="State-PIN"
          left={<FInput value={form.state_pin_1} onChange={v => setField("state_pin_1", v)} />}
          right={<FInput value={form.state_pin_2} onChange={v => setField("state_pin_2", v)} />}
          noPhoto
        />

        {/* Contact No */}
        <FormRow label="Contact No"
          left={<FInput value={form.contact_1} onChange={v => setField("contact_1", v)} />}
          right={<FInput value={form.contact_2} onChange={v => setField("contact_2", v)} />}
          noPhoto
        />

        {/* Blank row after contact */}
        <div className="grid border-b border-gray-400" style={{ gridTemplateColumns: "1fr 1fr 160px" }}>
          <div className="border-r border-gray-400 h-7" />
          <div className="border-r border-gray-400 h-7" />
          <div className="border-l border-gray-400 h-7 bg-gray-100 text-[10px] text-gray-500 text-center px-1 pt-1">Affix Passport size photo - Applicant2</div>
        </div>

        {/* Email */}
        <div className="grid border-b border-gray-400" style={{ gridTemplateColumns: "120px 1fr" }}>
          <div className="border-r border-gray-400 px-2 py-1.5 text-xs font-medium">Email Address</div>
          <FInput value={form.email} onChange={v => setField("email", v)} />
        </div>

        {/* Aadhar */}
        <div className="grid border-b border-gray-400" style={{ gridTemplateColumns: "120px 1fr" }}>
          <div className="border-r border-gray-400 px-2 py-1.5 text-xs font-medium">Aadhar No</div>
          <FInput value={form.aadhar} onChange={v => setField("aadhar", v)} />
        </div>

        {/* Blank separator */}
        <div className="grid grid-cols-3 border-b border-gray-400">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-r last:border-r-0 border-gray-400 h-6" />
          ))}
        </div>

        {/* Plot Header */}
        <div className="grid border-b border-gray-400 bg-gray-50 text-xs font-semibold" style={{ gridTemplateColumns: "80px 1fr 80px 1fr 80px 1fr" }}>
          <div className="border-r border-gray-400 px-2 py-1">Plot No</div>
          <div className="border-r border-gray-400 px-2 py-1 bg-gray-200">Sy.No</div>
          <div className="border-r border-gray-400 px-2 py-1"></div>
          <div className="border-r border-gray-400 px-2 py-1">Sq. Yards</div>
          <div className="border-r border-gray-400 px-2 py-1"></div>
          <div className="px-2 py-1"></div>
        </div>

        {/* Plot rows */}
        {form.plots.map((plot, i) => (
          <div key={i} className="grid border-b border-gray-400 text-xs" style={{ gridTemplateColumns: "80px 1fr 80px 1fr 80px 1fr" }}>
            <div className="border-r border-gray-400 px-1 py-0.5 text-gray-400 text-[11px] flex items-center">Plot No</div>
            <div className="border-r border-gray-400">
              <FInput value={plot.plot_no} onChange={v => setPlot(i, "plot_no", v)} small />
            </div>
            <div className="border-r border-gray-400 px-1 py-0.5 text-gray-400 text-[11px] flex items-center bg-gray-50">Sy.No</div>
            <div className="border-r border-gray-400">
              <FInput value={plot.sy_no} onChange={v => setPlot(i, "sy_no", v)} small />
            </div>
            <div className="border-r border-gray-400 px-1 py-0.5 text-gray-400 text-[11px] flex items-center">Sq. Yards</div>
            <div>
              <FInput value={plot.sq_yards} onChange={v => setPlot(i, "sq_yards", v)} small />
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="grid border-b border-gray-400 text-xs bg-gray-50" style={{ gridTemplateColumns: "80px 1fr 80px 1fr 80px 1fr" }}>
          <div className="col-span-4 border-r border-gray-400" />
          <div className="border-r border-gray-400 px-2 py-1 font-bold text-right">TOTAL Sq.Y</div>
          <div className="px-2 py-1 font-bold">{totalSqY > 0 ? totalSqY.toFixed(2) : ""}</div>
        </div>

        {/* Agreement */}
        <div className="px-3 py-2 border-b border-gray-400 text-xs">
          I agree to abide Association by and laws and will not interfere against the Association interest.
        </div>

        {/* Blank */}
        <div className="grid grid-cols-4 border-b border-gray-400">
          {[...Array(4)].map((_, i) => (<div key={i} className="border-r last:border-r-0 border-gray-400 h-10" />))}
        </div>

        {/* Signature row */}
        <div className="grid border-b border-gray-400" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
          <div className="border-r border-gray-400 h-8" />
          <div className="border-r border-gray-400 px-4 flex flex-col justify-center text-xs">
            <div className="flex items-center gap-2">
              <span className="italic font-medium">Signature:</span>
              <FInput value={form.signature_name} onChange={v => setField("signature_name", v)} inline />
            </div>
          </div>
          <div />
        </div>

        {/* Name row */}
        <div className="grid border-b border-gray-400" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
          <div className="border-r border-gray-400 h-7" />
          <div className="border-r border-gray-400 px-4 flex items-center text-xs gap-2">
            <span className="font-medium">(NAME):</span>
            <FInput value={form.signature_name} onChange={v => setField("signature_name", v)} inline />
          </div>
          <div />
        </div>

        {/* Received row */}
        <div className="grid border-b border-gray-400 text-xs" style={{ gridTemplateColumns: "160px 1fr" }}>
          <div className="border-r border-gray-400 px-2 py-1">
            <div>Received Rs.1000/-</div>
            <div>In Words: Rupees One Thousand Only</div>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="border-r border-gray-400 h-12" />
            <div className="px-2 py-1 flex items-end text-xs">(Authorised Signatory) &amp; Date</div>
          </div>
        </div>

        {/* Rep Signature */}
        <div className="grid border-b border-gray-400 text-xs" style={{ gridTemplateColumns: "160px 1fr" }}>
          <div className="border-r border-gray-400 px-2 py-1" />
          <div className="px-2 py-1 text-red-600 font-bold italic">Rep Signature:</div>
        </div>

        {/* Enclosures */}
        <div className="px-2 py-1 border-b border-gray-400">
          <p className="text-red-600 font-semibold text-xs">Enclosures</p>
        </div>

        {/* Rep Name + Enclosure rows */}
        <div className="grid border-b border-gray-400 text-xs" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="border-r border-gray-400 px-2 py-1">1. Copy of Sale Deed</div>
          <div className="px-2 py-1 flex items-center gap-2">
            <span className="text-red-600 font-medium">(Representative NAME):</span>
            <FInput value={form.rep_name} onChange={v => setField("rep_name", v)} inline />
          </div>
        </div>

        <div className="grid border-b border-gray-400 text-xs" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="border-r border-gray-400 px-2 py-1">2. Passport Size Photo</div>
          <div className="grid h-8" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="border-r border-gray-400" />
            <div />
          </div>
        </div>

        <div className="grid text-xs" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="border-r border-gray-400 px-2 py-1">3. Valid Identity proof (Adhaar card)</div>
          <div className="px-2 py-1 flex items-center">(Authorised Signatory) &amp; Date</div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable, #printable * { visibility: visible; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// Reusable inline input
function FInput({ value, onChange, small = false, inline = false }: { value: string; onChange: (value: string) => void; small?: boolean; inline?: boolean }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full bg-transparent border-none outline-none text-gray-800 ${small ? "text-[11px] px-1 py-0.5" : inline ? "text-xs px-1 py-0.5 w-32" : "text-xs px-2 py-1.5"} focus:bg-blue-50`}
    />
  );
}

// Reusable row for dual-applicant fields
function FormRow({
  label,
  left,
  right,
  photo,
  photoRows,
  firstPhotoRow = false,
  noPhoto = false,
}: {
  label: string;
  left: ReactNode;
  right: ReactNode;
  photo?: string;
  photoRows?: number;
  firstPhotoRow?: boolean;
  noPhoto?: boolean;
}) {
  if (firstPhotoRow) {
    return (
      <div className="grid border-b border-gray-400" style={{ gridTemplateColumns: "120px 1fr 1fr 160px" }}>
        <div className="border-r border-gray-400 px-2 py-1.5 text-xs font-medium">{label}</div>
        <div className="border-r border-gray-400">{left}</div>
        <div className="border-r border-gray-400">{right}</div>
        <div
          className="bg-gray-200 flex items-end justify-center text-[10px] text-gray-500 text-center px-1 pb-1"
          style={{ gridRow: `span ${photoRows || 1}` }}
        >
          {photo}
        </div>
      </div>
    );
  }

  if (noPhoto) {
    return (
      <div className="grid border-b border-gray-400" style={{ gridTemplateColumns: "120px 1fr 1fr 160px" }}>
        <div className="border-r border-gray-400 px-2 py-1.5 text-xs font-medium">{label}</div>
        <div className="border-r border-gray-400">{left}</div>
        <div className="border-r border-gray-400">{right}</div>
        <div className="border-l border-gray-400 h-7 bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="grid border-b border-gray-400" style={{ gridTemplateColumns: "120px 1fr 1fr 160px" }}>
      <div className="border-r border-gray-400 px-2 py-1.5 text-xs font-medium">{label}</div>
      <div className="border-r border-gray-400">{left}</div>
      <div className="border-r border-gray-400">{right}</div>
      <div className="border-l border-gray-400 h-7" />
    </div>
  );
}
