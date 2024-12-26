import { useQuery } from "@apollo/client";
import { queryBrands } from "../../api/brand/QueryBrands";
import { queryBrand } from "../../api/brand/QueryBrand";
import { Brand } from "../../gql/graphql";
import OptionSelect, { OptionType } from "../OptionSelect";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
// import { mutationCreateBrands } from "../../api/brand/CreateBrands";

const BrandManager = () => {
  // --------------------------------STATES--------------------------------
  const [selectedBrand, setSelectedBrand] = useState<OptionType<string> | null>(
    null
  );

  // --------------------------------QUERY--------------------------------

  const { data: brandsDataFromQuery } = useQuery(queryBrands);
  const brands = brandsDataFromQuery?.brands || [];
  console.log(brands);

  const { data: brandDataFromQuery } = useQuery(queryBrand, {
    variables: { brandId: `${1}` },
  });

  const brand = brandDataFromQuery?.brand;
  console.log(brand);

  // -----------------------------MUTATIONS-----------------------------------

  // const [doCreateBrand] = useMutation(mutationCreateBrands, {
  //   refetchQueries: [queryBrand],
  // });

  // -----------------------------FUNCTIONS-----------------------------------

  const handleBrandChange = (option: OptionType<string>) => {
    setSelectedBrand(option);
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className=" mb-4 text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200">
        Gestionnaire de marque
      </h1>
      <h2 className=" mb-4 text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
        Marques
      </h2>
      <div className="mb-4  w-80 flex items-center justify-between">
        <OptionSelect<string>
          options={brands.map((brand: Brand) => ({
            id: Number(brand.id),
            data: brand.name,
          }))}
          onSelect={handleBrandChange}
          actualOption={selectedBrand}
          defaultOption="Sélectionner une marque"
          getDisplayText={(data) => data}
        />
        <button
          onClick={() => setSelectedBrand(null)}
          title="Réinitialiser la marque"
          className="cursor-pointer text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover ml-2 py-[0.4rem] px-[0.6rem] rounded-lg transition-200"
        >
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
      </div>

      <h2 className="text-center font-bold text-2xl text-secondary dark:text-secondary-dark transition-200">
        Marque id 1
      </h2>
      {brand && (
        <p className="text-center font-bold text-4xl text-secondary dark:text-secondary-dark transition-200">
          {brand.name}
        </p>
      )}
    </section>
  );
};

export default BrandManager;
