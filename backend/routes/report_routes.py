from flask import Blueprint, send_file
from models.member_model import Member

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

report_bp = Blueprint(
    "report",
    __name__
)


@report_bp.route(
    "/member/<int:id>",
    methods=["GET"]
)
def generate_report(id):

    member = Member.query.get(id)

    if not member:
        return {
            "error": "Member not found"
        }, 404

    filename = f"fitness_report_{id}.pdf"

    doc = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "TitleStyle",
        parent=styles["Title"],
        textColor=colors.HexColor("#6D28D9"),
        fontSize=24
    )

    heading_style = ParagraphStyle(
        "HeadingStyle",
        parent=styles["Heading2"],
        textColor=colors.HexColor("#059669")
    )

    content = []

    content.append(
        Paragraph(
            "GYMPRO ELITE",
            title_style
        )
    )

    content.append(
        Paragraph(
            "AI FITNESS REPORT",
            heading_style
        )
    )

    content.append(
        Spacer(1, 20)
    )

    member_data = [
        ["Member Name", member.full_name],
        ["Email", member.email],
        ["Phone", member.phone],
        ["Age", str(member.age)],
        ["Gender", str(member.gender)],
        ["Goal", str(member.goal)]
    ]

    member_table = Table(
        member_data,
        colWidths=[170, 280]
    )

    member_table.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#EDE9FE")),
            ("GRID", (0, 0), (-1, -1), 1, colors.black)
        ])
    )

    content.append(member_table)

    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            "FITNESS ANALYSIS",
            heading_style
        )
    )

    fitness_data = [
        ["Height", f"{member.height} cm"],
        ["Weight", f"{member.weight} kg"],
        ["BMI", str(member.bmi)],
        ["Fitness Status", str(member.fitness_status)],
        ["Daily Calories", f"{member.daily_calories} kcal"],
        ["Workout Plan", str(member.workout_plan)]
    ]

    fitness_table = Table(
        fitness_data,
        colWidths=[170, 280]
    )

    fitness_table.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#DCFCE7")),
            ("GRID", (0, 0), (-1, -1), 1, colors.black)
        ])
    )

    content.append(
        fitness_table
    )

    content.append(
        Spacer(1, 20)
    )

    recommendation = """
    GymPro AI Recommendation

    • Maintain workout consistency 
    • Follow proper nutrition
    • Get adequate sleep recovery
    • Track weekly progress
    • Stay hydrated daily
    """

    content.append(
        Paragraph(
            recommendation,
            styles["BodyText"]
        )
    )

    doc.build(content)

    return send_file(
        filename,
        as_attachment=True
    )