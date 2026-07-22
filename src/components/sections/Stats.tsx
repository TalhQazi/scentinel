import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const stats = [
  // { value: 10000, suffix: "+", label: "Happy Customers" },
  { value: 99.9, suffix: "%", label: "Uptime Reliability" },
  { value: 24, suffix: "/7", label: "Protection" },
  { value: 50, suffix: "+", label: "Countries Served" },
];
const specs = [
  { label: "Sensors", value: "Smoke, CO, Temperature, Humidity" },
  { label: "Connectivity", value: "WiFi 802.11 b/g/n, Bluetooth 5.0" },
  { label: "Power", value: "Rechargeable Li-ion battery" },
  { label: "Dimensions", value: "120mm x 120mm x 40mm" },
  { label: "Weight", value: "250g" },
  { label: "Warranty", value: "2 years" },
];


const CountUpAnimation = ({
  end,
  duration = 2,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="py-20 bg-section-bg">
         {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Technical Specifications
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3   border-b border-border last:border-0"
                >
                  <span className="font-semibold text-re muted-foreground pr-4">
                    {spec.label}
                  </span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      <div className="container mx-auto px-4  mt-16 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsVisible(true)}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {isVisible ? (
                  <CountUpAnimation end={stat.value} suffix={stat.suffix} />
                ) : (
                  "0"
                )}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
