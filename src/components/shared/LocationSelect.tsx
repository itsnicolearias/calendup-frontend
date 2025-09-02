"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Country, State, City } from "country-state-city";

export default function LocationSelect() {
  const { control, watch, setValue } = useFormContext();

  const selectedCountry = watch("country") || "";
  const selectedState = watch("province") || "";

  const countries = Country.getAllCountries();
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

  return (
    <div className="space-y-4">
      {/* País */}
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium">País</label>
            <select
              {...field}
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e.target.value);
                setValue("state", "");
                setValue("city", "");
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option value="">Seleccionar país</option>
              {countries.map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      />

      {/* Provincia / Estado */}
      {selectedCountry && (
        <Controller
          name="province"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium">Provincia / Estado</label>
              <select
                {...field}
                value={field.value || ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setValue("city", "");
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">Seleccionar provincia</option>
                {states.map((prov) => (
                  <option key={prov.isoCode} value={prov.isoCode}>
                    {prov.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        />
      )}

      {/* Ciudad */}
      {selectedState && (
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium">Ciudad</label>
              <select
                {...field}
                value={field.value || ""}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">Seleccionar ciudad</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        />
      )}
    </div>
  );
}
