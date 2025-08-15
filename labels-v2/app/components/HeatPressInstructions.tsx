export default function HeatPressInstructions() {
  const steps = [
    {
      step: "Step 1",
      image: "/step1.png", // Replace with your actual image paths
      instructions: [
        "Set Heat Press at 310-320°F",
        "Firm pressure",
        "Position your DTF transfer",
      ],
    },
    {
      step: "Step 2",
      image: "/step2.png",
      instructions: ["Press for 10-11 secs"],
    },
    {
      step: "Step 3",
      image: "/step3.png",
      instructions: [
        "Peel when hot",
        "Re-press for 5 secs for ultimate soft feel",
      ],
    },
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-12">
        HEAT PRESSING INSTRUCTIONS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {steps.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md px-6 py-8 text-center"
          >
            <img
              src={item.image}
              alt={item.step}
              className="w-full h-48 object-cover mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">{item.step}</h3>
            <ul className="text-sm text-left list-none space-y-1">
              {item.instructions.map((line, i) => (
                <li key={i}>
                  <span className="font-bold">{i + 1}. </span>
                  <span className="font-semibold">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
