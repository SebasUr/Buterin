"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function RecommendedCourses() {
  const { data: courses, error, isLoading } = useSWR(
    "/api/learnify_app",
    fetcher
  );
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    if (courses && courses.length) {
      setDisplay(courses.slice(0, 3));
    }
  }, [courses]);

  if (isLoading) return <p>Cargando cursos recomendados…</p>;
  if (error) return <p className="text-red-500">Error al cargar cursos</p>;

  return (
    <section className="bg-muted py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
        Are you looking for learning?
      </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Explore our recommended courses in Learnify and start your learning journey today!
        </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-8">
        {display.map((c, idx) => (
          <Card key={idx}>
            <a
              href="http://localhost:8001"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
                <p className="text-sm mb-4">{c.description}</p>
                <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400">
                  <span>Dificulty: {c.difficulty}</span>
                  <span>Duration: {c.estimated_duration} min</span>
                  <span>Price: ${c.price}</span>
                </div>
              </CardContent>
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}
