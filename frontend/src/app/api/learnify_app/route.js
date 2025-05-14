"use server";
import { NextResponse } from "next/server";
import ApiProxy from "../proxy";

// URL de la API de Learnify en Django
const LEARNIFY_URL = "http://35.171.69.43/api/learnify_app/";

export async function GET(request) {
  try {
    // Hacemos GET al endpoint real usando tu ApiProxy
    const { response, status } = await ApiProxy.get(LEARNIFY_URL, false);
    // Devolvemos al cliente los datos JSON con el mismo status
    return NextResponse.json(response, { status });
  } catch (error) {
    // Manejo de errores: devolvemos mensaje y código 500
    console.error("Error proxying Learnify API:", error);
    return NextResponse.json(
      { error: "No se pudo obtener la lista de cursos." },
      { status: 500 }
    );
  }
}
