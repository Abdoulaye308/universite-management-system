package com.unchk.backend.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.lowagie.text.Font;
import com.unchk.backend.entity.AdministrationDocument;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AdministrationDocumentPdfService {

    // Couleurs
    private static final Color COLOR_PRIMARY    = new Color(29, 78, 216);   // bleu
    private static final Color COLOR_HEADER_BG  = new Color(239, 246, 255); // bleu clair
    private static final Color COLOR_ROW_ALT    = new Color(249, 250, 251); // gris très clair
    private static final Color COLOR_BORDER     = new Color(229, 231, 235); // gris bordure
    private static final Color COLOR_TEXT       = new Color(17, 24, 39);    // quasi-noir
    private static final Color COLOR_MUTED      = new Color(107, 114, 128); // gris texte

    public void export(
            List<AdministrationDocument> documents,
            HttpServletResponse response
    ) throws Exception {

        Document document = new Document(PageSize.A4.rotate(), 36, 36, 50, 40);
        PdfWriter writer = PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        // EN-TETE
        addHeader(document, documents.size());

        // TABLEAU
        addTable(document, documents);

        // PIED DE PAGE
        addFooter(document, writer);

        document.close();
    }


    // EN-TÊTE
    private void addHeader(Document document, int count) throws Exception {

        // Bande de titre
        PdfPTable headerTable = new PdfPTable(2);
        headerTable.setWidthPercentage(100);
        headerTable.setWidths(new float[]{3f, 1f});
        headerTable.setSpacingAfter(20);

        // Cellule titre
        Font titleFont = new Font(Font.HELVETICA, 20, Font.BOLD, Color.WHITE);
        Font subtitleFont = new Font(Font.HELVETICA, 10, Font.NORMAL, new Color(191, 219, 254));

        PdfPCell titleCell = new PdfPCell();
        titleCell.setBackgroundColor(COLOR_PRIMARY);
        titleCell.setPadding(16);
        titleCell.setBorder(Rectangle.NO_BORDER);

        Paragraph titlePara = new Paragraph("UNCHK — Documents Administratifs", titleFont);
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        Paragraph subPara = new Paragraph("Généré le " + date, subtitleFont);
        titleCell.addElement(titlePara);
        titleCell.addElement(subPara);
        headerTable.addCell(titleCell);

        // Cellule compteur
        Font countFont  = new Font(Font.HELVETICA, 28, Font.BOLD, Color.WHITE);
        Font countLabel = new Font(Font.HELVETICA, 9, Font.NORMAL, new Color(191, 219, 254));

        PdfPCell countCell = new PdfPCell();
        countCell.setBackgroundColor(COLOR_PRIMARY);
        countCell.setPadding(16);
        countCell.setBorder(Rectangle.NO_BORDER);
        countCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        countCell.setVerticalAlignment(Element.ALIGN_MIDDLE);

        Paragraph countPara = new Paragraph(String.valueOf(count), countFont);
        countPara.setAlignment(Element.ALIGN_CENTER);
        Paragraph countLabelPara = new Paragraph("documents", countLabel);
        countLabelPara.setAlignment(Element.ALIGN_CENTER);
        countCell.addElement(countPara);
        countCell.addElement(countLabelPara);
        headerTable.addCell(countCell);

        document.add(headerTable);
    }

    // TABLEAU
    private void addTable(Document document, List<AdministrationDocument> documents) throws Exception {

        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{0.8f, 1.5f, 2.5f, 1.5f});
        table.setSpacingBefore(8);

        // En-têtes colonnes
        String[] headers = { "ID", "Type", "Titre", "Date" };
        Font headerFont = new Font(Font.HELVETICA, 9, Font.BOLD, COLOR_PRIMARY);

        for (String h : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(h, headerFont));
            cell.setBackgroundColor(COLOR_HEADER_BG);
            cell.setPadding(8);
            cell.setPaddingLeft(10);
            cell.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBorderColor(COLOR_BORDER);
            cell.setBorderWidth(0.5f);
            table.addCell(cell);
        }

        // Lignes données
        Font cellFont  = new Font(Font.HELVETICA, 8, Font.NORMAL, COLOR_TEXT);
        Font mutedFont = new Font(Font.HELVETICA, 8, Font.NORMAL, COLOR_MUTED);

        int i = 0;
        for (AdministrationDocument doc : documents) {
            Color rowBg = (i % 2 == 0) ? Color.WHITE : COLOR_ROW_ALT;

            addCell(table, String.valueOf(doc.getId()),         mutedFont, rowBg, Element.ALIGN_CENTER);
            addCell(table, safe(doc.getType()),                cellFont,  rowBg, Element.ALIGN_LEFT);
            addCell(table, safe(doc.getTitre()),               cellFont,  rowBg, Element.ALIGN_LEFT);
            addCell(table, safe(doc.getDateCreation()),        mutedFont, rowBg, Element.ALIGN_CENTER);

            i++;
        }

        document.add(table);

        // Résumé sous le tableau
        Font summaryFont = new Font(Font.HELVETICA, 9, Font.ITALIC, COLOR_MUTED);
        Paragraph summary = new Paragraph("Total : " + documents.size() + " document(s)", summaryFont);
        summary.setSpacingBefore(8);
        document.add(summary);
    }


    // PIED DE PAGE
    private void addFooter(Document document, PdfWriter writer) throws Exception {

        PdfContentByte cb = writer.getDirectContent();

        // Ligne de séparation
        cb.setColorStroke(COLOR_BORDER);
        cb.setLineWidth(0.5f);
        cb.moveTo(36, 30);
        cb.lineTo(document.getPageSize().getWidth() - 36, 30);
        cb.stroke();

        // Texte pied de page
        Font footerFont = new Font(Font.HELVETICA, 8, Font.NORMAL, COLOR_MUTED);
        ColumnText.showTextAligned(
                cb,
                Element.ALIGN_LEFT,
                new Phrase("© UNCHK — Document confidentiel", footerFont),
                36, 18, 0
        );

        ColumnText.showTextAligned(
                cb,
                Element.ALIGN_RIGHT,
                new Phrase("Page 1", footerFont),
                document.getPageSize().getWidth() - 36, 18, 0
        );
    }

    // HELPERS
    private void addCell(PdfPTable table, String text, Font font, Color bg, int align) {
        PdfPCell cell = new PdfPCell(new Phrase(text != null ? text : "—", font));
        cell.setBackgroundColor(bg);
        cell.setPadding(7);
        cell.setPaddingLeft(10);
        cell.setHorizontalAlignment(align);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setBorderColor(COLOR_BORDER);
        cell.setBorderWidth(0.5f);
        table.addCell(cell);
    }

    private String safe(String val) {
        return val != null ? val : "—";
    }
}