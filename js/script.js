function selectTheme(themeId, button) {
    // Removing the 'selected' class from all theme cards
    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Removing 'btn-applied' class and change text back to 'Apply' for all buttons
    document.querySelectorAll('.apply-btn').forEach(btn => {
        btn.classList.remove('btn-applied');
        btn.textContent = 'Apply';
    });

    // Adding the 'selected' class to the clicked theme card
    document.getElementById(themeId).classList.add('selected');

    // Adding 'btn-applied' class and remove text to show the tick mark for the clicked button
    button.classList.add('btn-applied');
    button.textContent = ''; // Remove the text content
}


$(document).ready(function () {
    $('#skuCheckbox').change(function () {
        $('#skuCode').prop('disabled', !this.checked);
    });

    $('#nextButton').click(function () {
        const productName = $('#productName').val();
        const productDescription = $('#productDescription').val();
        const listPrice = parseFloat($('#listPrice').val()) || 0;
        const discountPercentage = parseFloat($('#discountPercentage').val()) || 0;
        const shippingCharges = parseFloat($('#shippingCharges').val()) || 0;

        // Calculating discounted price
        const discountedPrice = listPrice - (listPrice * discountPercentage / 100);

        // Calculating final price including shipping charges
        const finalPrice = discountedPrice + shippingCharges;

        // Updating preview content
        $('#previewTitle').text(productName || 'Product title');
        $('#previewDescription').text(productDescription || 'Product description goes here.');

        let strikeThroughPrice = `<del>RS ${listPrice.toFixed(2)}</del>`;
        $('#originalPrice').html(strikeThroughPrice);

        $('#discountedPrice').text(`RS ${discountedPrice.toFixed(2)}`);
        $('#finalPrice').text(`Final Price (incl. shipping): RS ${finalPrice.toFixed(2)}`);

        // Updating preview image
        const imageFile = $('#productImage')[0].files[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#previewImage').attr('src', e.target.result);
            };
            reader.readAsDataURL(imageFile);
        } else {
            $('#previewImage').attr('src', 'https://via.placeholder.com/150');
        }
    });

    // Triggering preview update on input change
    $('#productName, #productDescription, #listPrice, #discountPercentage, #shippingCharges').on('input', function () {
        $('#nextButton').click();
    });

    // Updating image preview in real-time
    $('#productImage').on('change', function () {
        $('#nextButton').click();
    });
});