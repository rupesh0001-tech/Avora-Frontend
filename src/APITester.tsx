import { useState, type FormEvent } from "react";

export function APITester() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const testEndpoint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse("Loading response...");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const endpoint = formData.get("endpoint") as string;
      const url = new URL(endpoint, location.href);
      const method = formData.get("method") as string;
      const res = await fetch(url, { method });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 mx-auto w-full max-w-2xl text-left flex flex-col gap-4">
      <form
        onSubmit={testEndpoint}
        className="flex items-center gap-2 bg-[#1a1a1a] p-3 rounded-xl font-mono border-2 border-[#fbf0df] transition-colors duration-300 focus-within:border-[#f3d5a3] w-full"
      >
        <select
          name="method"
          className="bg-[#fbf0df] text-[#1a1a1a] py-1.5 px-3 rounded-lg font-bold text-sm min-w-[0px] appearance-none cursor-pointer hover:bg-[#f3d5a3] transition-colors duration-100"
        >
          <option value="GET" className="py-1">
            GET
          </option>
          <option value="PUT" className="py-1">
            PUT
          </option>
        </select>
        <input
          type="text"
          name="endpoint"
          defaultValue="/api/hello"
          className="w-full flex-1 bg-transparent border-0 text-[#fbf0df] font-mono text-base py-1.5 px-2 outline-none focus:text-white placeholder-[#fbf0df]/40"
          placeholder="/api/hello"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#fbf0df] text-[#1a1a1a] border-0 px-5 py-1.5 rounded-lg font-bold transition-all duration-100 hover:bg-[#f3d5a3] hover:-translate-y-px cursor-pointer whitespace-nowrap flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-[#1a1a1a] border-t-transparent animate-spin"></span>
              Sending...
            </>
          ) : (
            "Send"
          )}
        </button>
      </form>
      <textarea
        readOnly
        value={response}
        placeholder="Response will appear here..."
        className="w-full min-h-[140px] bg-[#1a1a1a] border-2 border-[#fbf0df] rounded-xl p-3 text-[#fbf0df] font-mono resize-y focus:border-[#f3d5a3] placeholder-[#fbf0df]/40"
      />
    </div>
  );
}

