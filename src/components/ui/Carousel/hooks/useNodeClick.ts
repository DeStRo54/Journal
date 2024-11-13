import { useCallback, useEffect, useState } from 'react';

import { EmblaCarouselType } from 'embla-carousel';

type useNodeActionProps = {
	selectedIndex: number;
};

export const useNodeAction = (emblaApi: EmblaCarouselType | undefined): useNodeActionProps => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on('reInit', onSelect).on('select', onSelect);
	}, [emblaApi, onSelect]);

	return {
		selectedIndex,
	};
};
